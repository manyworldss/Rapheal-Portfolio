const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const rawHtml = fs.readFileSync(path.join(__dirname, '../demo/prox-onboarding-demo.html'), 'utf8');
const manifestMatch = rawHtml.match(/<script type="__bundler\/manifest">([\s\S]*?)<\/script>/);
if (!manifestMatch) throw new Error('No manifest found');
const manifest = JSON.parse(manifestMatch[1]);

// Decompress text files
const texts = {};
for (const [k, v] of Object.entries(manifest)) {
  const rawBuf = Buffer.from(v.data, 'base64');
  let buf = rawBuf;
  if (v.mime && (v.mime.includes('javascript') || v.mime.includes('jsx') || v.mime.includes('text'))) {
    try { buf = zlib.gunzipSync(rawBuf); } catch(e) {}
    texts[k] = buf.toString('utf8');
  }
}

// Extract base images
const imgUuids = {
  produceBg: '42261af6-a699-4351-a371-7aa0792b0741',
  dealsReady: '6f375d74-b13d-4ab8-946b-2cb5dbfad945',
  cardDeals: 'f4df92af-1cac-478f-b864-26429aaebbbf',
  cardStores: 'daa6ace3-5adf-40ea-8b07-b01d20cdbd66',
  cardList: '039bb755-b1e6-4252-a082-9366f363547a'
};

const imgData = {};
for (const [name, uuid] of Object.entries(imgUuids)) {
  if (manifest[uuid]) {
    imgData[name] = 'data:' + manifest[uuid].mime + ';base64,' + manifest[uuid].data;
  }
}

// 1. Get iOS device component
let iosCode = texts['4952d6ac-f2d4-4e39-8fcc-35b2ce141fe1'];
// 2. Get ProxComponents
let compCode = texts['a4e2ef9f-1228-4ca2-aa73-397fd2ca197c'];
// 3. Get Screen definitions
let s1Code = texts['217ea464-a5a6-4aea-a72b-580bc1d5aebd'];
let s2Code = texts['78f0bb1a-d8d8-4de8-9bb9-df50c1659ec2'];
let s3Code = texts['87962dd6-9c3b-44f0-985a-63d15eb68c35'];

// Replace image UUIDs with base64 data URIs
const replaceImages = (code) => {
  for (const [name, uuid] of Object.entries(imgUuids)) {
    if (imgData[name]) {
      code = code.split(uuid).join(imgData[name]);
    }
  }
  return code;
};

iosCode = replaceImages(iosCode);
compCode = replaceImages(compCode);
s1Code = replaceImages(s1Code);
s2Code = replaceImages(s2Code);
s3Code = replaceImages(s3Code);

// Custom minimal ProxApp that is PURELY a phone mockup demo
const customAppCode = `
const SCREENS = [
  { id: 0,  label: '01 Splash',            comp: 'Screen0_Splash' },
  { id: 1,  label: '02 Welcome',           comp: 'Screen1_Welcome' },
  { id: 2,  label: '03 Create Account',    comp: 'Screen2_SignUp' },
  { id: 3,  label: '04 Verify Email',      comp: 'Screen3_VerifyEmail' },
  { id: 4,  label: '05 Choose Stores',     comp: 'Screen4_Stores' },
  { id: 5,  label: '06 Food Preferences',  comp: 'Screen5_FoodPrefs' },
  { id: 6,  label: '07 Feature Reveal',    comp: 'Screen6_FeatureReveal' },
  { id: 7,  label: '08 Savings Preview',   comp: 'Screen7_SavingsPreview' },
  { id: 8,  label: '09 Location Access',   comp: 'Screen9_Location' },
  { id: 9,  label: '10 Building Prox',     comp: 'Screen10_BuildingProx' },
  { id: 10, label: '11 Notification Echo', comp: 'Screen12_NotificationEcho' },
  { id: 11, label: '12 Deals Ready',       comp: 'Screen13_DealsReady' },
];

function ProxApp() {
  const [idx, setIdx] = React.useState(0);
  const [email, setEmail] = React.useState('jamie@example.com');
  const [firstName, setFirstName] = React.useState('Jamie');
  const [zip, setZip] = React.useState('30308');

  const next = () => setIdx(i => Math.min(i + 1, SCREENS.length - 1));
  const prev = () => setIdx(i => Math.max(i - 1, 0));
  const go = (i) => setIdx(Math.max(0, Math.min(i, SCREENS.length - 1)));

  const renderScreen = (screenIdx) => {
    const s = SCREENS[screenIdx];
    const C = window[s.comp];
    if (!C) return (
      <div style={{ padding: 24, color: '#211B16', fontFamily: 'Nunito, sans-serif' }}>
        <h3 style={{ fontSize: 18, fontWeight: 800 }}>{s.label}</h3>
        <p style={{ marginTop: 8, color: 'rgba(33,27,22,0.6)' }}>Screen component ready</p>
        <button onClick={next} style={{ marginTop: 16, padding: '10px 18px', background: '#175C43', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 700, cursor: 'pointer' }}>Continue</button>
      </div>
    );
    const passProps = {
      onNext: () => next(),
      onBack: () => prev(),
      onSkip: () => next(),
      onGetStarted: () => next(),
      onSignUp: (d) => {
        if (d?.email) setEmail(d.email);
        if (d?.firstName) setFirstName(d.firstName);
        if (d?.zip) setZip(d.zip);
        next();
      },
      onVerify: () => next(),
      onSelectStores: () => next(),
      onSelectPrefs: () => next(),
      onContinue: () => next(),
      onTap: () => next(),
      onAllow: () => next(),
      onOpen: () => {
        setIdx(0);
      },
      email, firstName, zip,
      defaultZip: zip,
      buildMode: 'honest'
    };
    return <C {...passProps}/>;
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 35%, #1a422b 0%, #0c2014 60%, #06110a 100%)',
      fontFamily: 'Nunito, system-ui, -apple-system, sans-serif',
      padding: '24px 16px',
      boxSizing: 'border-box',
    }}>
      {/* Centered iPhone device */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          boxShadow: '0 35px 80px -20px rgba(0,0,0,0.8), 0 0 100px -20px rgba(23,92,67,0.4)',
          borderRadius: 54,
        }}>
          <IOSDevice width={385} height={775}>
            {renderScreen(idx)}
          </IOSDevice>
        </div>

        {/* Minimal floating navigation pill below phone */}
        <div style={{
          marginTop: 20,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 999,
          padding: '6px 16px',
          color: '#F4EBDD',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          userSelect: 'none',
        }}>
          <button onClick={prev} disabled={idx === 0}
            style={{
              background: 'transparent', border: 'none', color: idx === 0 ? 'rgba(244,235,221,0.25)' : '#F4EBDD',
              cursor: idx === 0 ? 'default' : 'pointer', fontSize: 18, fontWeight: 800, padding: '0 6px', lineHeight: 1,
            }}>‹</button>

          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: 'rgba(244,235,221,0.9)' }}>
            {idx + 1} of {SCREENS.length} · {SCREENS[idx].label.replace(/^\\d+\\s*/, '')}
          </span>

          <button onClick={next} disabled={idx === SCREENS.length - 1}
            style={{
              background: 'transparent', border: 'none', color: idx === SCREENS.length - 1 ? 'rgba(244,235,221,0.25)' : '#F4EBDD',
              cursor: idx === SCREENS.length - 1 ? 'default' : 'pointer', fontSize: 18, fontWeight: 800, padding: '0 6px', lineHeight: 1,
            }}>›</button>

          <button onClick={() => go(0)} title="Restart from beginning"
            style={{
              marginLeft: 6, background: 'rgba(242, 207, 88, 0.18)', border: '1px solid rgba(242, 207, 88, 0.35)',
              color: '#F2CF58', borderRadius: 999, padding: '2px 10px', fontSize: 10, fontWeight: 800, cursor: 'pointer',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>Reset</button>
        </div>
      </div>
    </div>
  );
}

window.ProxApp = ProxApp;
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prox · iOS Onboarding Interactive Prototype</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { min-height: 100vh; background: #0c2014; font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif; overflow-x: hidden; }
    #root { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

  <script type="text/babel">
${iosCode}
  </script>

  <script type="text/babel">
${compCode}
  </script>

  <script type="text/babel">
${s1Code}
  </script>

  <script type="text/babel">
${s2Code}
  </script>

  <script type="text/babel">
${s3Code}
  </script>

  <script type="text/babel">
${customAppCode}
  </script>

  <script type="text/babel">
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<ProxApp />);
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../demo/prox-onboarding-demo.html'), html);
console.log('Successfully generated clean mobile phone demo: ' + (html.length / 1024).toFixed(1) + ' KB');
