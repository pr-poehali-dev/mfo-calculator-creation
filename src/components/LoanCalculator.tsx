import React, { useState, useEffect } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [term, setTerm] = useState<number>(14);

  // Параметры МФО
  const DAILY_RATE = 0.015; // 1.5% в день

  const calculateLoan = () => {
    const totalInterest = loanAmount * DAILY_RATE * term;
    const totalAmount = loanAmount + totalInterest;
    
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + term);
    const formattedDate = returnDate.toLocaleDateString('ru-RU');
    
    return { totalAmount, formattedDate };
  };

  const { totalAmount, formattedDate } = calculateLoan();

  const handleSubmitApplication = () => {
    window.open('https://www.money-financei.ru/theapplicationisoffline', '_blank');
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
        maxWidth: '800px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Заголовок */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
            💰 Калькулятор займов
          </div>
          <div style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>
            Быстрый займ до 15 000 ₽ на карту за 5 минут
          </div>
        </div>

        {/* Сумма займа */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '16px',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            <span>💳 Сумма займа</span>
            <span>{loanAmount.toLocaleString('ru-RU')} ₽</span>
          </div>
          <input
            type="range"
            min="1000"
            max="15000"
            step="500"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '18px', 
            color: 'rgba(255, 255, 255, 0.7)', 
            marginTop: '16px', 
            padding: '0 20px' 
          }}>
            <span>1 000 ₽</span>
            <span>15 000 ₽</span>
          </div>
        </div>

        {/* Срок займа */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '16px',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            <span>📅 Срок займа</span>
            <span>{term} дней</span>
          </div>
          <input
            type="range"
            min="1"
            max="14"
            step="1"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '18px', 
            color: 'rgba(255, 255, 255, 0.7)', 
            marginTop: '16px', 
            padding: '0 20px' 
          }}>
            <span>1 день</span>
            <span>14 дней</span>
          </div>
        </div>
        
        {/* Результат расчета */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(34, 197, 94, 0.05) 100%)',
          padding: '32px',
          borderRadius: '20px',
          border: '2px solid rgba(30, 64, 175, 0.2)'
        }}>
          <div style={{ textAlign: 'center' }}>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              padding: '32px',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              marginBottom: '32px'
            }}>
              <div style={{ fontSize: '22px', color: '#64748b', marginBottom: '16px' }}>
                К возврату {formattedDate}
              </div>
              <div style={{ fontSize: '56px', fontWeight: '700', color: '#1e40af', lineHeight: '1' }}>
                {totalAmount.toLocaleString('ru-RU')} ₽
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '32px',
              background: 'rgba(255, 255, 255, 0.5)',
              padding: '24px',
              borderRadius: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '20px',
                color: '#64748b'
              }}>
                <span style={{ fontSize: '24px' }}>%</span>
                <span>Ставка 1,5% в день</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '20px',
                color: '#64748b'
              }}>
                <span style={{ fontSize: '24px' }}>🛡️</span>
                <span>Без комиссий</span>
              </div>
            </div>
            
            <button 
              onClick={handleSubmitApplication}
              style={{
                width: '100%',
                height: '72px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '28px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 12px 30px rgba(30, 64, 175, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(30, 64, 175, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(30, 64, 175, 0.3)';
              }}
            >
              📤 Получить займ сейчас
            </button>
          </div>
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1e40af;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 20px rgba(30, 64, 175, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1e40af;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          div[style*="max-width: 800px"] {
            padding: 20px !important;
          }
          div[style*="fontSize: '56px'"] {
            font-size: 40px !important;
          }
          div[style*="fontSize: '28px'"] {
            font-size: 22px !important;
          }
          div[style*="fontSize: '22px'"] {
            font-size: 18px !important;
          }
          button[style*="height: '72px'"] {
            height: 60px !important;
            font-size: 22px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoanCalculator;