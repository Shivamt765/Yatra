import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Download } from 'lucide-react';
import { CSVLink } from 'react-csv';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Tabs from '@radix-ui/react-tabs';

interface Query {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  package_name: string;
  created_at: string;
}

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

const PAGE_SIZE = 20;

const ContactAdmin = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [queryPage, setQueryPage] = useState(1);
  const [subscriberPage, setSubscriberPage] = useState(1);
  const [hasMoreQueries, setHasMoreQueries] = useState(true);
  const [hasMoreSubscribers, setHasMoreSubscribers] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchQueries = async (page = 1, append = true) => {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from('package_queries')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)
      .ilike('name', `%${searchQuery}%`);

    if (error) console.error(error);
    else {
      setQueries(prev => append ? [...prev, ...(data || [])] : (data || []));
      if ((data?.length || 0) < PAGE_SIZE) setHasMoreQueries(false);
    }
  };
  const queryHeaders = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Message', key: 'message' },
  { label: 'Package Name', key: 'package_name' },
  { label: 'Created At', key: 'created_at' }
];

const subscriberHeaders = [
  { label: 'ID', key: 'id' },
  { label: 'Email', key: 'email' },
  { label: 'Created At', key: 'created_at' }
];

  const fetchSubscribers = async (page = 1, append = true) => {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)
      .ilike('email', `%${searchQuery}%`);

    if (error) console.error(error);
    else {
      setSubscribers(prev => append ? [...prev, ...(data || [])] : (data || []));
      if ((data?.length || 0) < PAGE_SIZE) setHasMoreSubscribers(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    setLoading(true);
    setQueries([]);
    setSubscribers([]);
    setQueryPage(1);
    setSubscriberPage(1);
    setHasMoreQueries(true);
    setHasMoreSubscribers(true);

    const load = async () => {
      await fetchQueries(1, false);
      await fetchSubscribers(1, false);
      setLoading(false);
    };

    load();
  }, [searchQuery]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
        />
      </div> */}

      <Tabs.Root defaultValue="tab1">
        <Tabs.List className="flex gap-4 mb-6 border-b-2 border-gray-300">
          <Tabs.Trigger value="tab1" className="px-4 py-2 font-medium">Queries</Tabs.Trigger>
          <Tabs.Trigger value="tab2" className="px-4 py-2 font-medium">Newsletter</Tabs.Trigger>
        </Tabs.List>

        {/* Queries */}
        <Tabs.Content value="tab1">
          <div className="flex justify-end mb-4">
<CSVLink
  data={queries}
  headers={queryHeaders}
  filename={"queries.csv"} // <-- Must be a string in quotes
  uFEFF={true} // for Excel UTF-8
  className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
>
  <Download className="w-4 h-4" /> Export Queries
</CSVLink>
          </div>
          <InfiniteScroll
            dataLength={queries.length}
            next={() => {
              const nextPage = queryPage + 1;
              setQueryPage(nextPage);
              fetchQueries(nextPage);
            }}
            hasMore={hasMoreQueries}
            loader={<p className="text-center py-4">Loading more...</p>}
            height={500}
            className="overflow-auto"
          >
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Package</th>
                  <th className="border px-4 py-2">Message</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {queries.map(q => (
                  <tr key={q.id}>
                    <td className="border px-4 py-2">{q.name}</td>
                    <td className="border px-4 py-2">{q.email}</td>
                    <td className="border px-4 py-2">{q.phone}</td>
                    <td className="border px-4 py-2">{q.package_name}</td>
                    <td className="border px-4 py-2">{q.message}</td>
                    <td className="border px-4 py-2">{new Date(q.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </Tabs.Content>

        {/* Newsletter */}
        <Tabs.Content value="tab2">
          <div className="flex justify-end mb-4">
            <CSVLink
              data={subscribers}
              filename="subscribers.csv"
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              <Download className="w-4 h-4" /> Export CSV
            </CSVLink>
          </div>
          <InfiniteScroll
            dataLength={subscribers.length}
            next={() => {
              const nextPage = subscriberPage + 1;
              setSubscriberPage(nextPage);
              fetchSubscribers(nextPage);
            }}
            hasMore={hasMoreSubscribers}
            loader={<p className="text-center py-4">Loading more...</p>}
            height={500}
            className="overflow-auto"
          >
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(s => (
                  <tr key={s.id}>
                    <td className="border px-4 py-2">{s.email}</td>
                    <td className="border px-4 py-2">{new Date(s.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default ContactAdmin;
