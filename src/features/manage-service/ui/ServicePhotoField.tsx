import styles from './styles/ServicePhotoField.module.css';
import { ArrowLeft, ArrowRight, Camera, MoreHorizontal, Trash2 } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Toast } from '@/shared/ui/Toast/Toast';

export interface ServicePhoto { url: string; file?: File }
export interface ServicePhotosValue { photos: ServicePhoto[]; avatarUrl: string }
interface ServicePhotoFieldProps { photoUrls?: string[]; avatarUrl?: string; onChange?: (value: ServicePhotosValue) => void }

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024;
const slideVariants = {
  enter: (direction: number) => ({ x: direction * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -48, opacity: 0 }),
};

function PhotoPreview({ url, index }: { url: string; index: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={styles.failed} role="img" aria-label={`Не удалось загрузить фото ${index + 1}`}><Camera size={32} aria-hidden="true" /><span>Не удалось загрузить фото</span></div>;
  return <img src={url} alt={`Фото услуги ${index + 1}`} className={styles.image} onError={() => setFailed(true)} draggable={false} />;
}

export function ServicePhotoField({ photoUrls = [], avatarUrl, onChange }: ServicePhotoFieldProps) {
  const urls = photoUrls.filter((url) => url.trim().length > 0);
  const sourceKey = JSON.stringify([urls, avatarUrl]);
  const [gallery, setGallery] = useState(() => ({
    sourceKey, photos: urls.map((url): ServicePhoto => ({ url })),
    avatarUrl: avatarUrl && urls.includes(avatarUrl) ? avatarUrl : urls[0] ?? '', index: 0, direction: 1,
  }));
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ownedUrls = useRef(new Set<string>());
  const pickerMode = useRef<'append' | 'replace'>('append');
  const reduceMotion = useReducedMotion();

  if (gallery.sourceKey !== sourceKey) {
    setError('');
    setGallery({ sourceKey, photos: urls.map((url) => gallery.photos.find((photo) => photo.url === url) ?? { url }), avatarUrl: avatarUrl && urls.includes(avatarUrl) ? avatarUrl : urls[0] ?? '', index: 0, direction: 1 });
  }

  useEffect(() => () => { ownedUrls.current.forEach((url) => URL.revokeObjectURL(url)); ownedUrls.current.clear(); }, []);
  useEffect(() => {
    if (!isMenuOpen) return;
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setIsMenuOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [isMenuOpen]);

  const activePhoto = gallery.photos[gallery.index];
  const isAvatar = activePhoto?.url === gallery.avatarUrl;
  const selectFiles = (mode: 'append' | 'replace' = 'append') => { if (!inputRef.current) return; pickerMode.current = mode; inputRef.current.value = ''; inputRef.current.click(); };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);
    if (!files.length) return;
    if (files.some((file) => !acceptedTypes.includes(file.type))) { event.currentTarget.value = ''; setError('Выберите фото в формате PNG, JPEG или WebP.'); return; }
    if (files.some((file) => file.size > maxFileSize)) { event.currentTarget.value = ''; setError('Размер каждого фото не должен превышать 5 МБ.'); return; }
    const selected = files.map((file) => { const url = URL.createObjectURL(file); ownedUrls.current.add(url); return { url, file }; });
    const replacing = Boolean(activePhoto && pickerMode.current === 'replace');
    const photos = replacing ? gallery.photos.map((photo, index) => index === gallery.index ? selected[0] : photo) : [...gallery.photos, ...selected];
    const nextAvatarUrl = gallery.avatarUrl || selected[0]?.url || '';
    setGallery({ ...gallery, photos, avatarUrl: nextAvatarUrl, index: activePhoto ? gallery.index : 0 });
    setError(''); onChange?.({ photos, avatarUrl: nextAvatarUrl });
  };

  const goTo = (direction: number) => { setGallery((current) => ({ ...current, direction, index: (current.index + direction + current.photos.length) % current.photos.length })); setError(''); };
  const makeAvatar = () => { if (!activePhoto) return; setGallery({ ...gallery, avatarUrl: activePhoto.url }); onChange?.({ photos: gallery.photos, avatarUrl: activePhoto.url }); setIsMenuOpen(false); setIsToastOpen(true); };
  const deleteActivePhoto = () => {
    if (!activePhoto) return;
    const photos = gallery.photos.filter((_, index) => index !== gallery.index);
    const nextAvatarUrl = activePhoto.url === gallery.avatarUrl ? photos[0]?.url ?? '' : gallery.avatarUrl;
    setGallery({ ...gallery, photos, avatarUrl: nextAvatarUrl, index: photos.length ? Math.min(gallery.index, photos.length - 1) : 0 });
    onChange?.({ photos, avatarUrl: nextAvatarUrl }); setIsDeleteModalOpen(false); setIsMenuOpen(false);
  };

  return <section className={styles.section} aria-label="Фотографии услуги">
    <input ref={inputRef} type="file" name="photo" accept={acceptedTypes.join(',')} multiple onChange={handleFiles} className={styles.input} aria-label="Выбрать фотографии услуги" tabIndex={-1} />
    <div className={styles.viewport}>
      {!activePhoto ? <button type="button" className={styles.fallback} onClick={() => selectFiles()}><span className={styles.camera}><Camera size={32} aria-hidden="true" /></span><strong className={styles.title}>Добавить фото</strong><span className={styles.hint}>Рекомендуем 4:3, до 5 МБ</span></button> : <>
        <div className={styles.slides} aria-roledescription="карусель"><AnimatePresence initial={false} custom={gallery.direction}><motion.div key={`${gallery.index}:${activePhoto.url}`} className={styles.slide} custom={gallery.direction} variants={reduceMotion ? undefined : slideVariants} initial={reduceMotion ? false : 'enter'} animate={reduceMotion ? undefined : 'center'} exit={reduceMotion ? undefined : 'exit'} transition={{ duration: reduceMotion ? 0 : .25, ease: 'easeOut' }}><PhotoPreview url={activePhoto.url} index={gallery.index} /></motion.div></AnimatePresence></div>
        <div className={styles.badges}><span className={styles.badge} role="status" aria-label={`Фото ${gallery.index + 1} из ${gallery.photos.length}`}>{gallery.index + 1}/{gallery.photos.length}</span>{isAvatar && <span className={styles.badge}>Аватарка</span>}</div>
        <div ref={menuRef} className={styles.menuWrap}><button type="button" className={styles.menuButton} aria-label="Действия с фотографией" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}><MoreHorizontal size={22} aria-hidden="true" /></button>{isMenuOpen && <div className={styles.menu} role="menu"><button type="button" role="menuitem" onClick={makeAvatar} disabled={isAvatar}><Camera size={17} aria-hidden="true" />{isAvatar ? 'Это аватарка' : 'Сделать аватаркой'}</button><button type="button" role="menuitem" onClick={() => { setIsMenuOpen(false); selectFiles(); }}><Camera size={17} aria-hidden="true" />Добавить фото</button><button type="button" role="menuitem" onClick={() => { setIsMenuOpen(false); setIsDeleteModalOpen(true); }}><Trash2 size={17} aria-hidden="true" />Удалить изображение</button></div>}</div>
        {gallery.photos.length > 1 && <div className={styles.navigation}><button type="button" className={styles.arrow} onClick={() => goTo(-1)} aria-label="Предыдущее фото"><ArrowLeft size={24} aria-hidden="true" /></button><button type="button" className={styles.arrow} onClick={() => goTo(1)} aria-label="Следующее фото"><ArrowRight size={24} aria-hidden="true" /></button></div>}
      </>}
    </div>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <Toast message="Аватарка услуги изменена" isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} />
    <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Удалить изображение?"><p className={styles.confirmText}>Вы уверены?</p><div className={styles.confirmActions}><button type="button" className={styles.confirmNo} onClick={() => setIsDeleteModalOpen(false)}>Нет</button><button type="button" className={styles.confirmYes} onClick={deleteActivePhoto}>Да</button></div></Modal>
  </section>;
}
