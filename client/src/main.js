const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(container);
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(App)
  )
);