export function GiftBox({ open }: { open: boolean }) {
  return <span className={`gift-box ${open ? 'gift-open' : ''}`} aria-hidden="true"><span className="gift-bow">♡</span><span className="gift-lid" /><span className="gift-body" /><span className="gift-heart">♥</span></span>;
}