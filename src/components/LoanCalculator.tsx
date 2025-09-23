import React, { useState, useEffect } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [term, setTerm] = useState<number>(7);

  // Параметры МФО
  const DAILY_RATE = 0.015; // 1.5% в день

  const calculateLoan = () => {
    const totalInterest = loanAmount * DAILY_RATE * term;
    const totalAmount = loanAmount + totalInterest;
    
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + term);
    const formattedDate = returnDate.toLocaleDateString('ru-RU');
    
    return { totalAmount, totalInterest, formattedDate };
  };

  const { totalAmount, totalInterest, formattedDate } = calculateLoan();

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
        maxWidth: '500px',
        width: '100%',
        background: 'white',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Заголовок */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e40af', marginBottom: '8px' }}>
            💰 Займ онлайн
          </div>
          <div style={{ fontSize: '16px', color: '#64748b' }}>
            До 15 000 ₽ за 5 минут
          </div>
        </div>

        {/* Форма */}
        <div style={{ marginBottom: '32px' }}>
          {/* Сумма займа */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '12px' 
            }}>
              Сумма займа: <span style={{ color: '#1e40af', fontSize: '18px' }}>{loanAmount.toLocaleString('ru-RU')} ₽</span>
            </label>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                background: '#e5e7eb',
                borderRadius: '3px',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '14px', 
              color: '#9ca3af', 
              marginTop: '8px'
            }}>
              <span>1 000 ₽</span>
              <span>15 000 ₽</span>
            </div>
          </div>

          {/* Срок займа */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '12px' 
            }}>
              Срок займа: <span style={{ color: '#1e40af', fontSize: '18px' }}>{term} дней</span>
            </label>
            <input
              type="range"
              min="1"
              max="14"
              step="1"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                background: '#e5e7eb',
                borderRadius: '3px',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '14px', 
              color: '#9ca3af', 
              marginTop: '8px'
            }}>
              <span>1 день</span>
              <span>14 дней</span>
            </div>
          </div>
        </div>
        
        {/* Результат расчета */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #e0f2fe',
          marginBottom: '24px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '8px' }}>
              К возврату {formattedDate}
            </div>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#1e40af', marginBottom: '16px' }}>
              {totalAmount.toLocaleString('ru-RU')} ₽
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Получите</div>
                <div style={{ fontSize: '20px', fontWeight: '600', color: '#059669' }}>
                  {loanAmount.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Переплата</div>
                <div style={{ fontSize: '20px', fontWeight: '600', color: '#ea580c' }}>
                  {totalInterest.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              fontSize: '14px',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>%</span>
                <span>1,5% в день</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>🛡️</span>
                <span>Без комиссий</span>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка */}
        <button 
          onClick={handleSubmitApplication}
          style={{
            width: '100%',
            height: '56px',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 8px 25px rgba(30, 64, 175, 0.3)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(30, 64, 175, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(30, 64, 175, 0.3)';
          }}
        >
          📤 Получить займ сейчас
        </button>

        {/* Дополнительная информация */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '16px', 
          fontSize: '12px', 
          color: '#9ca3af' 
        }}>
          Без скрытых комиссий • Деньги на карту за 5 минут
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1e40af;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4);
        }

        input[type="range"]::-webkit-slider-track {
          background: #e5e7eb;
          border-radius: 3px;
          height: 6px;
        }

        input[type="range"]::-webkit-slider-thumb:active {
          background: #1d4ed8;
        }

        input[type="range"]::-moz-range-thumb {
          border: 3px solid white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1e40af;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-track {
          background: #e5e7eb;
          border-radius: 3px;
          height: 6px;
          border: none;
        }

        @media (max-width: 768px) {
          div[style*="maxWidth: '500px'"] {
            margin: 0 16px;
            padding: 24px !important;
          }
          div[style*="fontSize: '48px'"] {
            font-size: 36px !important;
          }
          div[style*="fontSize: '32px'"] {
            font-size: 28px !important;
          }
          button[style*="height: '56px'"] {
            height: 52px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoanCalculator;