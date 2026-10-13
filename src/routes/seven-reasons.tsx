import { createFileRoute } from '@tanstack/react-router';
import { Journey } from '@/components/birthday/Journey';
import { pageHead } from '@/lib/birthday';

export const Route = createFileRoute('/seven-reasons')({
  head: () => pageHead(8),
  component: BirthdayPage,
});
function BirthdayPage() { return <Journey step={8} />; }
