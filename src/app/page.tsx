import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <div>hello</div>
      <Image src={'icons/logo.svg'} alt="logo" width={200} height={200} />
    </div>
  );
}
