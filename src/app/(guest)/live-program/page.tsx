import { Header, NavHeader } from '@/components';
import Image from 'next/image';

export default function LivePage() {
  return (
    <div>
      <NavHeader />
      <div>hello</div>
      <Image src={'icons/logo.svg'} alt="logo" width={200} height={200} />
    </div>
  );
}
