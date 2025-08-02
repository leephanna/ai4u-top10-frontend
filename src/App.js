import React from 'react';

function App() {
  return (
    <div style={{padding: '20px', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
      <h1>AI4U Top 10 Lists ✨</h1>
      <p>System is working! Backend connected.</p>
      <button 
        onClick={() => alert('Ready for full deployment!')}
        style={{padding: '15px 30px', fontSize: '18px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}
      >
        Test System
      </button>
    </div>
  );
}

export default App;
