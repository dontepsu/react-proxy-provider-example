import React from 'react';
import { fetchData } from './dataResource';

interface LazyLoadContext {
    data?: string[];
    loading: boolean;
}

const LazyLoadContext = React.createContext<LazyLoadContext>({
    data: undefined,
    loading: false,
});

export function LazyLoadProvider (props: any) {

    const [ data, setData ] = React.useState<string[]>();
    const [ loading, setLoading ] = React.useState(false);

    React.useEffect(() => {
        if (loading && !data) {
            const fetch = async () => {
                const data = await fetchData();
                setData(data);
                setLoading(false);
            };

            fetch();
        }

    }, [loading, data, setData, setLoading]);
 
    const value = React.useMemo(() => {

        const v =  {
            data,
            loading,
        };

        if (!data && !loading) {
            // this is where the magic happens. if not loading or data present
            // define 'data' and a getter.
            Object.defineProperty(v, 'data', {
                get () {
                    // to avoid errors, push the setLoading call at bottom of the call stack
                    window.setTimeout(() => setLoading(true), 0);

                    return data;
                }
            });
        }

        return v;
    }, [data, loading, setLoading]);

    return <LazyLoadContext.Provider {...props} value={value} />;
}

export function useLazyData () {
    const context = React.useContext(LazyLoadContext);

    return context;
}
