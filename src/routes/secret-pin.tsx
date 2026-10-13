import { createFileRoute } from '@tanstack/react-router';
import { Journey } from '@/components/birthday/Journey';
import { pageHead } from '@/lib/birthday';

export const Route = createFileRoute('/secret-pin')({
  head: () => pageHead(1),
  component: BirthdayPage,
});
function BirthdayPage() { return <Journey step=1 />; }
