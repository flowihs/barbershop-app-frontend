import ListScroll from '../../shared/ui/ListScroll/ListScroll';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../entities/provision/api/provisionApi';
import DefaultError from '../../shared/ui/DefaultError/DefaultError';

function CategoryList() {

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  if (error) return <DefaultError text={`Error is: ${errorMessage} ${error.cause}`} />

  if (isLoading) {
    return <p className='text-text-secondary text-sm p-4'>Loading...</p>
  }

  return (
    <section>
      <div className="flex justify-between my-4 px-2">
        <p className="text-xl pb-3 text-text-primary">
          Категории
        </p>
      </div>
      <ListScroll>
        {categories?.map((cat) => (
          <button
            key={cat.id}
            className="flex flex-col items-center gap-2 min-w-18 overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-bg-card-2 flex items-center justify-center text-text-primary">
              {/*{cat.icon}*/}
            </div>
            <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">
              {cat.name}
            </span>
          </button>
        ))}
      </ListScroll>
    </section>
  )
}

export default CategoryList
