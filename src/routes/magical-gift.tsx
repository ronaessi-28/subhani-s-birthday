import { createFileRoute } from '@tanstack/react-router';
import { Journey } from '@/components/birthday/Journey';
import { pageHead } from '@/lib/birthday';

export const Route = createFileRoute('/magical-gift')({
  head: () => pageHead(2),
  component: BirthdayPage,
});
function BirthdayPage() { return <Journey step={2} />; }
