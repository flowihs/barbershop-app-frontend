import { Calendar } from 'lucide-react'
import './actions-buttons.less'

function ActionsButton({
	onEdit,
	onSchedule,
}: {
	onEdit: () => void
	onSchedule: () => void
}) {
	return (
		<section className='actions-buttons'>
			<div className='buttons-wrapper'>
				<button onClick={onSchedule} className='action-btn action-btn-schedule'>
					<Calendar className='action-icon' />
					<span>View Schedule</span>
				</button>
				<button onClick={onEdit} className='action-btn action-btn-edit'>
					<span>Edit Profile</span>
				</button>
			</div>
		</section>
	)
}

export default ActionsButton
