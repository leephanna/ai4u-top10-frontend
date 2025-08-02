import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateList = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('https://ai4u-top10-backend.vercel.app/api/generate-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: prompt.trim(),
          email: email.trim() 
        }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Network error - please try again'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', color: 'white' }}>
        <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '20px' }}>
          AI4U Top 10 Lists ✨
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '40px' }}>
          AI-Researched Amazon Products with Real Affiliate Links!
        </p>

        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '15px', marginBottom: '30px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              What products are you looking for?
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., organic potato chips, baby diapers, gaming laptops..."
              style={{ 
                width: '100%', 
                padding: '15px', 
                borderRadius: '8px', 
                border: 'none',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{ 
                width: '100%', 
                padding: '15px', 
                borderRadius: '8px', 
                border: 'none',
                fontSize: '16px'
              }}
            />
          </div>
          
          <button
            onClick={generateList}
            disabled={loading || !prompt.trim()}
            style={{ 
              width: '100%', 
              padding: '15px', 
              background: loading ? '#999' : '#ff6b6b', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '18px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Researching Products...' : 'Generate Top 10 List'}
          </button>
        </div>

        {result && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '15px' }}>
            {result.success ? (
              <div>
                <h2 style={{ marginBottom: '20px' }}>{result.title}</h2>
                <p style={{ marginBottom: '20px' }}>{result.intro}</p>
                
                {result.products && result.products.map((product, index) => (
                  <div key={index} style={{ 
                    background: 'rgba(255,255,255,0.1)', 
                    padding: '20px', 
                    marginBottom: '15px', 
                    borderRadius: '10px' 
                  }}>
                    <h3>{index + 1}. {product.title}</h3>
                    <p><strong>Price:</strong> {product.price}</p>
                    <p><strong>Rating:</strong> {product.rating}/5 ⭐</p>
                    <p>{product.description}</p>
                    <a 
                      href={product.affiliate_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        background: '#ff9900', 
                        color: 'white', 
                        padding: '10px 20px', 
                        textDecoration: 'none', 
                        borderRadius: '5px',
                        display: 'inline-block',
                        marginTop: '10px'
                      }}
                    >
                      View on Amazon
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
                <p>Error: {result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
}

export default App;
