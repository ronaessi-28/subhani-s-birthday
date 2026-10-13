import { createFileRoute } from '@tanstack/react-router';
import { Journey } from '@/components/birthday/Journey';
import { pageHead } from '@/lib/birthday';

export const Route = createFileRoute('/our-gallery')({
  head: () => pageHead(7),
  component: BirthdayPage,
});
function BirthdayPage() { return <Journey step=7 />; }
