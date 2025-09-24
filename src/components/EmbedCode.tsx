import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const EmbedCode = () => {
  const [copied, setCopied] = useState(false);

  const htmlCode = `<!-- 💰 Умный калькулятор займов v2.0 -->
<!-- Встройка для любого сайта: Тильда, WordPress, Wix -->
<div id="smart-loan-calc" style="max-width: 520px; margin: 20px auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: transparent;">
  <div style="background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%); border-radius: 28px; padding: 36px; box-shadow: 0 25px 70px rgba(0, 0, 0, 0.08), 0 10px 40px rgba(0, 0, 0, 0.04); border: 1px solid rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); position: relative; overflow: hidden;">
    
    <!-- Декоративные элементы -->
    <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(30, 64, 175, 0.05)); border-radius: 50%; z-index: 0;"></div>
    <div style="position: absolute; bottom: -30px; left: -30px; width: 100px; height: 100px; background: linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05)); border-radius: 50%; z-index: 0;"></div>
    
    <!-- Заголовок -->
    <div style="text-align: center; margin-bottom: 36px; position: relative; z-index: 1;">
      <div style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #1e40af); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 36px; font-weight: 800; margin-bottom: 12px; text-shadow: none;">
        💰 Займ за 5 минут
      </div>
      <div style="font-size: 18px; color: #64748b; font-weight: 500;">
        💳 До 50 000 ₽ • ⚡ Мгновенное одобрение • 🛡️ Без скрытых комиссий
      </div>
      <div style="margin-top: 16px; padding: 8px 16px; background: linear-gradient(90deg, #10b981, #059669); border-radius: 20px; display: inline-block; color: white; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
        🔥 Лучшие условия
      </div>
    </div>

    <!-- Сумма займа с улучшенным дизайном -->
    <div style="margin-bottom: 32px; position: relative; z-index: 1;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <label style="font-size: 18px; font-weight: 700; color: #1f2937; display: flex; align-items: center; gap: 8px;">
          💵 Сумма займа
        </label>
        <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 8px 16px; border-radius: 12px; border: 1px solid #bfdbfe;">
          <span id="amount-display" style="color: #1e40af; font-size: 20px; font-weight: 800;">25 000 ₽</span>
        </div>
      </div>
      <div style="position: relative; padding: 8px 0;">
        <input type="range" id="amount-slider" min="3000" max="50000" step="1000" value="25000" 
               style="width: 100%; height: 16px; background: linear-gradient(90deg, #e2e8f0 0%, #e2e8f0 100%); border-radius: 12px; outline: none; cursor: pointer; transition: all 0.4s; appearance: none; -webkit-appearance: none;">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 16px; background: linear-gradient(90deg, #3b82f6 0%, #1e40af 44%); border-radius: 12px; pointer-events: none; z-index: -1;"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #64748b; margin-top: 12px; font-weight: 500;">
        <span>3 000 ₽</span>
        <span style="color: #059669; font-weight: 600;">Рекомендуем</span>
        <span>50 000 ₽</span>
      </div>
    </div>

    <!-- Срок займа с улучшенным дизайном -->
    <div style="margin-bottom: 32px; position: relative; z-index: 1;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <label style="font-size: 18px; font-weight: 700; color: #1f2937; display: flex; align-items: center; gap: 8px;">
          📅 Срок займа
        </label>
        <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 8px 16px; border-radius: 12px; border: 1px solid #bbf7d0;">
          <span id="term-display" style="color: #059669; font-size: 20px; font-weight: 800;">14 дней</span>
        </div>
      </div>
      <div style="position: relative; padding: 8px 0;">
        <input type="range" id="term-slider" min="7" max="30" step="1" value="14"
               style="width: 100%; height: 16px; background: linear-gradient(90deg, #e2e8f0 0%, #e2e8f0 100%); border-radius: 12px; outline: none; cursor: pointer; transition: all 0.4s; appearance: none; -webkit-appearance: none;">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 16px; background: linear-gradient(90deg, #10b981 0%, #059669 47%); border-radius: 12px; pointer-events: none; z-index: -1;"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #64748b; margin-top: 12px; font-weight: 500;">
        <span>7 дней</span>
        <span style="color: #0891b2; font-weight: 600;">Оптимально</span>
        <span>30 дней</span>
      </div>
    </div>

    <!-- Результат расчета с премиум дизайном -->
    <div style="background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%); padding: 32px; border-radius: 24px; border: 2px solid #e2e8f0; margin-bottom: 32px; position: relative; overflow: hidden; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);">
      <!-- Декоративный элемент -->
      <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), transparent); border-radius: 50%;"></div>
      
      <div style="text-align: center; position: relative; z-index: 1;">
        <div style="font-size: 16px; color: #64748b; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;" id="return-date">
          📅 К возврату через 14 дней
        </div>
        <div style="font-size: 52px; font-weight: 900; background: linear-gradient(135deg, #1e40af, #3b82f6); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 24px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);" id="total-amount">
          25 525 ₽
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 24px;">
          <div style="text-align: center; padding: 16px; background: linear-gradient(135deg, #ecfdf5, #d1fae5); border-radius: 16px; border: 1px solid #a7f3d0;">
            <div style="font-size: 12px; color: #065f46; margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">💰 Получите</div>
            <div style="font-size: 22px; font-weight: 800; color: #059669;" id="loan-amount">
              25 000 ₽
            </div>
          </div>
          <div style="text-align: center; padding: 16px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 16px; border: 1px solid #f59e0b;">
            <div style="font-size: 12px; color: #92400e; margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">📈 Переплата</div>
            <div style="font-size: 22px; font-weight: 800; color: #d97706;" id="interest-amount">
              525 ₽
            </div>
          </div>
          <div style="text-align: center; padding: 16px; background: linear-gradient(135deg, #ede9fe, #ddd6fe); border-radius: 16px; border: 1px solid #a78bfa;">
            <div style="font-size: 12px; color: #5b21b6; margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">📊 Ставка</div>
            <div style="font-size: 22px; font-weight: 800; color: #7c3aed;" id="daily-rate">
              1.5%
            </div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: center; gap: 24px; font-size: 14px; color: #64748b; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: rgba(59, 130, 246, 0.1); border-radius: 20px;">
            <span>⚡</span>
            <span style="font-weight: 600;">За 5 минут</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: rgba(16, 185, 129, 0.1); border-radius: 20px;">
            <span>🛡️</span>
            <span style="font-weight: 600;">Без комиссий</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: rgba(245, 158, 11, 0.1); border-radius: 20px;">
            <span>📱</span>
            <span style="font-weight: 600;">На карту</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Кнопка -->
    <button onclick="submitLoanApplication()" 
            style="width: 100%; height: 56px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; border: none; border-radius: 16px; font-size: 18px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 35px rgba(30, 64, 175, 0.4)'"
            onmouseout="this.style.transform='translateY(0px)'; this.style.boxShadow='0 8px 25px rgba(30, 64, 175, 0.3)'">
      📤 Получить займ сейчас
    </button>

    <!-- Дополнительная информация -->
    <div style="text-align: center; margin-top: 16px; font-size: 12px; color: #9ca3af;">
      Без скрытых комиссий • Деньги на карту за 5 минут
    </div>
  </div>
</div>

<style>
#loan-calculator-widget input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  cursor: pointer;
  border: 5px solid white;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

#loan-calculator-widget input[type="range"]::-webkit-slider-thumb:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

#loan-calculator-widget input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 8px 25px rgba(30, 64, 175, 0.6);
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
}

#loan-calculator-widget input[type="range"]::-webkit-slider-thumb:active {
  transform: scale(0.95);
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.8);
}

#loan-calculator-widget input[type="range"]::-webkit-slider-track {
  background: linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 100%);
  border-radius: 10px;
  height: 12px;
  position: relative;
}

#loan-calculator-widget input[type="range"]::-moz-range-thumb {
  border: 5px solid white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

#loan-calculator-widget input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 8px 25px rgba(30, 64, 175, 0.6);
}

#loan-calculator-widget input[type="range"]::-moz-range-track {
  background: linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 100%);
  border-radius: 10px;
  height: 12px;
  border: none;
}

#loan-calculator-widget input[type="range"]:hover::-webkit-slider-track {
  background: linear-gradient(90deg, #d1d5db 0%, #d1d5db 100%);
}

#loan-calculator-widget input[type="range"]:focus {
  outline: none;
}

#loan-calculator-widget input[type="range"]:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3), 0 4px 16px rgba(30, 64, 175, 0.4);
}

@media (max-width: 768px) {
  #loan-calculator-widget > div {
    margin: 0 16px;
    padding: 24px !important;
  }
  #loan-calculator-widget div[style*="font-size: 48px"] {
    font-size: 36px !important;
  }
  #loan-calculator-widget div[style*="font-size: 32px"] {
    font-size: 28px !important;
  }
  #loan-calculator-widget button {
    height: 52px !important;
    font-size: 16px !important;
  }
}
</style>

<script>
// Калькулятор займов - JavaScript
let currentAmount = 10000;
let currentTerm = 7;
const DAILY_RATE = 0.015; // 1.5% в день

function calculateLoan() {
  const totalInterest = currentAmount * DAILY_RATE * currentTerm;
  const totalAmount = currentAmount + totalInterest;
  
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + currentTerm);
  const formattedDate = returnDate.toLocaleDateString('ru-RU');
  
  // Обновляем интерфейс
  document.getElementById('amount-display').textContent = currentAmount.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('term-display').textContent = currentTerm + ' дней';
  document.getElementById('loan-amount').textContent = currentAmount.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('interest-amount').textContent = Math.round(totalInterest).toLocaleString('ru-RU') + ' ₽';
  document.getElementById('total-amount').textContent = Math.round(totalAmount).toLocaleString('ru-RU') + ' ₽';
  document.getElementById('return-date').textContent = 'К возврату ' + formattedDate;
}

function updateAmount(value) {
  currentAmount = parseInt(value);
  calculateLoan();
}

function updateTerm(value) {
  currentTerm = parseInt(value);
  calculateLoan();
}

function submitLoanApplication() {
  // Открываем форму заявки
  window.open('https://www.money-financei.ru/theapplicationisoffline', '_blank');
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
  // Привязываем обработчики событий
  const amountSlider = document.getElementById('amount-slider');
  const termSlider = document.getElementById('term-slider');
  
  if (amountSlider) {
    amountSlider.addEventListener('input', function() {
      updateAmount(this.value);
    });
  }
  
  if (termSlider) {
    termSlider.addEventListener('input', function() {
      updateTerm(this.value);
    });
  }
  
  // Первоначальный расчет
  calculateLoan();
});
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
            🔗 Код для встройки калькулятора
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.8 }}>
            Скопируйте код и вставьте на свой сайт через Тильду, WordPress или любой другой конструктор
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Превью калькулятора */}
          <div>
            <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }}>
              📱 Превью калькулятора
            </h2>
            <div style={{ 
              background: 'white', 
              borderRadius: '24px', 
              padding: '20px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
            }}>
              <iframe 
                srcDoc={htmlCode}
                style={{
                  width: '100%',
                  height: '600px',
                  border: 'none',
                  borderRadius: '16px'
                }}
                title="Превью калькулятора"
              />
            </div>
          </div>

          {/* Код для копирования */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '600' }}>
                📋 HTML код
              </h2>
              <Button 
                onClick={copyToClipboard}
                style={{
                  background: copied ? '#059669' : '#1e40af',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {copied ? (
                  <>
                    <Icon name="Check" size={18} style={{ marginRight: '8px' }} />
                    Скопировано!
                  </>
                ) : (
                  <>
                    <Icon name="Copy" size={18} style={{ marginRight: '8px' }} />
                    Копировать код
                  </>
                )}
              </Button>
            </div>

            <div style={{
              background: '#1a1a1a',
              borderRadius: '16px',
              padding: '20px',
              maxHeight: '600px',
              overflow: 'auto',
              border: '1px solid #333'
            }}>
              <pre style={{
                color: '#e5e7eb',
                fontSize: '12px',
                lineHeight: '1.5',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {htmlCode}
              </pre>
            </div>

            {/* Инструкции */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              marginTop: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                📝 Как использовать:
              </h3>
              <ul style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: '1.6' }}>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Тильда:</strong> Добавить блок "HTML код" и вставить весь код
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>WordPress:</strong> Использовать блок "Произвольный HTML"
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Другие сайты:</strong> Вставить код в любое место HTML страницы
                </li>
                <li>
                  <strong>Настройка:</strong> Код полностью автономный и не требует дополнительных библиотек
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedCode;