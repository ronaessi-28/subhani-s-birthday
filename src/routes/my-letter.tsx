import { createFileRoute } from '@tanstack/react-router';
import { Journey } from '@/components/birthday/Journey';
import { pageHead } from '@/lib/birthday';

export const Route = createFileRoute('/my-letter')({
  head: () => pageHead(6),
  component: BirthdayPage,
});
function BirthdayPage() { return <Journey step=6 />; }
