
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Loading() {
    return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" />
}