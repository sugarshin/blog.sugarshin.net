// ref: https://segment.com/docs/sources/website/analytics.js/quickstart/

const analytics = [];

// A list of the methods in Analytics.js to stub.
analytics.methods = [
  'trackSubmit',
  'trackClick',
  'trackLink',
  'trackForm',
  'pageview',
  'identify',
  'reset',
  'group',
  'track',
  'ready',
  'alias',
  'page',
  'once',
  'off',
  'on'
];

// Define a factory to create stubs. These are placeholders
// for methods in Analytics.js so that you never have to wait
// for it to load to actually record data. The `method` is
// stored as the first argument, so we can replay the data.
analytics.factory = method => (...args) => {
  const argStr = JSON.stringify(args).replace(/^\[|\]$/g, '');
  if (window.console && window.console.info && process.env.NODE_ENV !== 'production') {
    window.console.info(`Segment: ${method}(${argStr})`);
  }
  if (window.analytics && window.analytics[method]) {
    window.analytics[method].apply(window.analytics, args);
    return window.analytics;
  }
  args.unshift(method);
  analytics.push(args);
  return analytics;
};

// For each of our methods, generate a queueing stub.
for (let i = 0; i < analytics.methods.length; i++) {
  const key = analytics.methods[i];
  analytics[key] = analytics.factory(key);
}

// Define a method to load Analytics.js from our CDN,
// and that will be sure to only ever load it once.
analytics.load = key => {
  // Create an async script element based on your key.
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = `${
    'https:' === document.location.protocol ? 'https://' : 'http://'
  }cdn.segment.com/analytics.js/v1/${key}/analytics.min.js`;

  // Insert our script next to the first script element.
  const first = document.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(script, first);
};

// Add a version to keep track of what's in the wild.
analytics.SNIPPET_VERSION = '3.1.0';

// Load Analytics.js with your key, which will automatically
// load the tools you've enabled for your account. Boosh!
// analytics.load("YOUR_WRITE_KEY");

// Make the first page call to load the integrations. If
// you'd like to manually name or tag the page, edit or
// move this call however you'd like.
// analytics.page();

module.exports = analytics;
