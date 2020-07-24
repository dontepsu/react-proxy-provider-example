import React from 'react';
import { useLazyData } from './LazyProvider';

export const App: React.FC = () => {
  const [ showMore, setShowMore ] = React.useState(false);
  // object destructing is considered as access.
  // it's not an issue if you want to load the data without user interaction
  // i.e once user hits a certain route
  const lazy = useLazyData();

  const handleShowMore = () => setShowMore(true);

  return (
    <div>
      <header>
        <h1>react-proxy-provider-example</h1>
      </header>
      <main>
        <p>So this is the deal, you should click the "show more" to lazy load more content</p>
        {!showMore && <button onClick={handleShowMore}>Show more</button>}
        {showMore && lazy.data?.map((p, i) => <p key={i}>{p}</p>)}
      </main>
    </div>
  )
}
