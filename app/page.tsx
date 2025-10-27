'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setName('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '60px 50px',
        maxWidth: '600px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '10px'
          }}>
            Product Information Request
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#718096'
          }}>
            Get detailed info about our products sent directly to your inbox
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#2d3748',
              fontSize: '14px'
            }}>
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'border-color 0.3s',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#2d3748',
              fontSize: '14px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'border-color 0.3s',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#2d3748',
              fontSize: '14px'
            }}>
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you're interested in..."
              rows={4}
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'border-color 0.3s',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: loading ? '#a0aec0' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#5568d3';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#667eea';
            }}
          >
            {loading ? 'Sending...' : 'Send Product Information'}
          </button>
        </form>

        {status === 'success' && (
          <div style={{
            marginTop: '25px',
            padding: '16px',
            backgroundColor: '#c6f6d5',
            border: '2px solid #68d391',
            borderRadius: '10px',
            color: '#22543d',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            Product information sent successfully! Check your inbox.
          </div>
        )}

        {status === 'error' && (
          <div style={{
            marginTop: '25px',
            padding: '16px',
            backgroundColor: '#fed7d7',
            border: '2px solid #fc8181',
            borderRadius: '10px',
            color: '#742a2a',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            Failed to send email. Please try again later.
          </div>
        )}

        <div style={{
          marginTop: '40px',
          padding: '30px',
          backgroundColor: '#f7fafc',
          borderRadius: '15px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '15px'
          }}>
            What you'll receive:
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              'Complete product catalog with pricing',
              'Technical specifications and features',
              'Demo links and video tutorials',
              'Special offers and discounts',
              'Contact information for support'
            ].map((item, index) => (
              <li key={index} style={{
                marginBottom: '12px',
                paddingLeft: '28px',
                position: 'relative',
                color: '#4a5568',
                fontSize: '14px'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#667eea',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
