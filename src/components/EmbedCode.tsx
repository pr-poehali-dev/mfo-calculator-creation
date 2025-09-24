import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const EmbedCode = () => {
  const [copied, setCopied] = useState(false);

  const htmlCode = `<!-- Калькулятор займов для встройки на сайт -->
<div id="loan-calculator-widget" style="max-width: 500px; margin: 20px auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="background: white; border-radius: 24px; padding: 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
    
    <!-- Заголовок -->
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="font-size: 32px; font-weight: 700; color: #1e40af; margin-bottom: 8px;">
        💰 Займ онлайн
      </div>
      <div style="font-size: 16px; color: #64748b;">
        До 15 000 ₽ за 5 минут
      </div>
    </div>

    <!-- Сумма займа -->
    <div style="margin-bottom: 24px;">
      <label style="display: block; font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 12px;">
        Сумма займа: <span id="amount-display" style="color: #1e40af; font-size: 18px;">10 000 ₽</span>
      </label>
      <input type="range" id="amount-slider" min="1000" max="15000" step="500" value="10000" 
             style="width: 100%; height: 12px; background: linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 100%); border-radius: 10px; outline: none; cursor: pointer; transition: all 0.3s;">
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #9ca3af; margin-top: 8px;">
        <span>1 000 ₽</span>
        <span>15 000 ₽</span>
      </div>
    </div>

    <!-- Срок займа -->
    <div style="margin-bottom: 24px;">
      <label style="display: block; font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 12px;">
        Срок займа: <span id="term-display" style="color: #1e40af; font-size: 18px;">7 дней</span>
      </label>
      <input type="range" id="term-slider" min="1" max="14" step="1" value="7"
             style="width: 100%; height: 12px; background: linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 100%); border-radius: 10px; outline: none; cursor: pointer; transition: all 0.3s;">
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #9ca3af; margin-top: 8px;">
        <span>1 день</span>
        <span>14 дней</span>
      </div>
    </div>

    <!-- Результат расчета -->
    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 24px; border-radius: 16px; border: 2px solid #e0f2fe; margin-bottom: 24px;">
      <div style="text-align: center;">
        <div style="font-size: 16px; color: #64748b; margin-bottom: 8px;" id="return-date">
          К возврату
        </div>
        <div style="font-size: 48px; font-weight: 700; color: #1e40af; margin-bottom: 16px;" id="total-amount">
          10 000 ₽
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div style="text-align: center;">
            <div style="font-size: 14px; color: #64748b; margin-bottom: 4px;">Получите</div>
            <div style="font-size: 20px; font-weight: 600; color: #059669;" id="loan-amount">
              10 000 ₽
            </div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 14px; color: #64748b; margin-bottom: 4px;">Переплата</div>
            <div style="font-size: 20px; font-weight: 600; color: #ea580c;" id="interest-amount">
              1 050 ₽
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: center; gap: 16px; font-size: 14px; color: #64748b;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span>%</span>
            <span>1,5% в день</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span>🛡️</span>
            <span>Без комиссий</span>
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
/* Современные ползунки - удобные для мобильных и ПК */
#smart-loan-calc input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 24px;
  background: transparent;
  outline: none;
  border-radius: 16px;
  cursor: pointer;
  position: relative;
  padding: 12px 0;
  margin: 12px 0;
  touch-action: none;
}

/* Трек ползунка - толще и современнее */
#smart-loan-calc input[type="range"]::-webkit-slider-track {
  height: 24px;
  background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 16px;
  position: relative;
  box-shadow: 
    inset 0 2px 8px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(255, 255, 255, 0.8);
  border: 1px solid #e2e8f0;
}

/* Крупный ползунок с эмодзи - очень удобный для пальцев */
#smart-loan-calc input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  cursor: grab;
  border: 4px solid #3b82f6;
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.25),
    0 6px 20px rgba(0, 0, 0, 0.08),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  margin-top: -20px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Эмодзи внутри ползунка через CSS content */
#smart-loan-calc #amount-slider::-webkit-slider-thumb::after {
  content: '💰';
  position: absolute;
  font-size: 24px;
  line-height: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

#smart-loan-calc #term-slider::-webkit-slider-thumb::after {
  content: '📅';
  position: absolute;
  font-size: 24px;
  line-height: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

/* Анимация при наведении - более плавная */
#smart-loan-calc input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.08);
  box-shadow: 
    0 16px 50px rgba(59, 130, 246, 0.3),
    0 8px 25px rgba(0, 0, 0, 0.12),
    inset 0 2px 4px rgba(255, 255, 255, 1);
  border-color: #1e40af;
}

/* Анимация при нажатии - тактильная обратная связь */
#smart-loan-calc input[type="range"]::-webkit-slider-thumb:active {
  cursor: grabbing;
  transform: scale(0.92);
  box-shadow: 
    0 6px 20px rgba(59, 130, 246, 0.4),
    0 3px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Firefox поддержка - тот же крупный дизайн */
#smart-loan-calc input[type="range"]::-moz-range-thumb {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  cursor: grab;
  border: 4px solid #3b82f6;
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.25),
    0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  -moz-appearance: none;
}

#smart-loan-calc input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.08);
  box-shadow: 
    0 16px 50px rgba(59, 130, 246, 0.3),
    0 8px 25px rgba(0, 0, 0, 0.12);
}

#smart-loan-calc input[type="range"]::-moz-range-track {
  height: 24px;
  background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.06);
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

/* Фокус для доступности - важно для клавиатурной навигации */
#smart-loan-calc input[type="range"]:focus {
  outline: none;
}

#smart-loan-calc input[type="range"]:focus::-webkit-slider-thumb {
  box-shadow: 
    0 0 0 4px rgba(59, 130, 246, 0.3),
    0 12px 40px rgba(59, 130, 246, 0.25),
    0 6px 20px rgba(0, 0, 0, 0.08),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  outline: none;
}

/* Адаптивность для мобильных - ещё больше ползунки */
@media (max-width: 768px) {
  #smart-loan-calc > div {
    margin: 0 12px;
    padding: 28px !important;
  }
  
  /* Ползунки на мобильных ещё крупнее */
  #smart-loan-calc input[type="range"]::-webkit-slider-thumb {
    width: 72px !important;
    height: 72px !important;
    margin-top: -24px !important;
  }
  
  #smart-loan-calc input[type="range"]::-moz-range-thumb {
    width: 72px !important;
    height: 72px !important;
  }
  
  /* Трек тоже толще */
  #smart-loan-calc input[type="range"]::-webkit-slider-track {
    height: 28px !important;
  }
  
  #smart-loan-calc input[type="range"]::-moz-range-track {
    height: 28px !important;
  }
  
  /* Увеличиваем эмодзи на мобильных */
  #smart-loan-calc #amount-slider::-webkit-slider-thumb::after,
  #smart-loan-calc #term-slider::-webkit-slider-thumb::after {
    font-size: 28px !important;
  }
  
  /* Адаптивные размеры текста */
  #smart-loan-calc div[style*="font-size: 52px"] {
    font-size: 42px !important;
  }
  #smart-loan-calc div[style*="font-size: 36px"] {
    font-size: 32px !important;
  }
  #smart-loan-calc button {
    height: 60px !important;
    font-size: 18px !important;
    font-weight: 800 !important;
  }
  
  /* Увеличиваем отступы между элементами на мобильных */
  #smart-loan-calc input[type="range"] {
    padding: 16px 0 !important;
    margin: 16px 0 !important;
  }
}
</style>

<script>
// 🚀 Умный калькулятор займов v2.0 - JavaScript
let currentAmount = 25000;
let currentTerm = 14;
const DAILY_RATE = 0.015; // 1.5% в день - выгодная ставка

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