import Draw from './Draw';

export default function RootLayout({ children }) {
  return (
    <main className="flex space-x-4 divide-x-2 p-5">
      <div className="flex-1 pl-5">
        <Draw />
        <div>{children}</div>
      </div>
    </main>
  );
}
