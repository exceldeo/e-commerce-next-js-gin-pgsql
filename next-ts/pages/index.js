import PageHead from '../src/components/Helpers/PageHead';
import Home from '../src/components/Home/index';

export default function HomePage() {
  return (
    <>
      <PageHead title='Home' metaDes='E-Commerce' />
      <Home />
    </>
  );
}
