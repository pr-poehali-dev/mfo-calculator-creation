import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const EmbedCode = () => {
  const [copied, setCopied] = useState(false);

  const htmlCode = `<!-- Калькулятор займов для встройки на сайт -->
<div id="loan-calculator-widget" style="max-width: 500px; margin: 20px auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="background: white; border-radius: 24px; padding: 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);">
    
    <!-- Сумма займа -->
    <div style="margin-bottom: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <label style="font-size: 24px; font-weight: 600; color: #1f2937;">
          Сумма займа
        </label>
        <div id="amount-display" style="background: #f3f4f6; border-radius: 12px; padding: 12px 20px; font-size: 24px; font-weight: 700; color: #1f2937;">
          10 000 ₽
        </div>
      </div>
      <input type="range" id="amount-slider" min="1000" max="30000" step="100" value="10000" 
             style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 10px; outline: none; cursor: pointer; -webkit-appearance: none; appearance: none;">
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #6b7280; margin-top: 8px;">
        <span>1 000 ₽</span>
        <span>30 000 ₽</span>
      </div>
    </div>

    <!-- Срок займа -->
    <div style="margin-bottom: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <label style="font-size: 24px; font-weight: 600; color: #1f2937;">
          Срок
        </label>
        <div id="term-display" style="background: #f3f4f6; border-radius: 12px; padding: 12px 20px; font-size: 24px; font-weight: 700; color: #1f2937;">
          7 дней
        </div>
      </div>
      <input type="range" id="term-slider" min="7" max="30" step="1" value="7"
             style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 10px; outline: none; cursor: pointer; -webkit-appearance: none; appearance: none;">
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #6b7280; margin-top: 8px;">
        <span>7 дней</span>
        <span>30 дней</span>
      </div>
    </div>

    <!-- Кнопка -->
    <button onclick="submitLoanApplication()" 
            style="width: 100%; height: 64px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border: none; border-radius: 50px; font-size: 22px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3); margin-bottom: 24px;"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 35px rgba(59, 130, 246, 0.4)'"
            onmouseout="this.style.transform='translateY(0px)'; this.style.boxShadow='0 8px 25px rgba(59, 130, 246, 0.3)'">
      Получить деньги
    </button>

    <!-- Дополнительная информация -->
    <div style="text-align: center; font-size: 16px; color: #6b7280; margin-bottom: 24px;">
      Быстрая заявка через Т-Банк или Госуслуги
    </div>

    <!-- Кнопки авторизации -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px;">
      <button onclick="loginTBank()" 
              style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 16px; background: white; border: 2px solid #3b82f6; border-radius: 50px; font-size: 16px; font-weight: 600; color: #1f2937; cursor: pointer; transition: all 0.3s;"
              onmouseover="this.style.background='#eff6ff'"
              onmouseout="this.style.background='white'">
        <span style="font-size: 24px;">🏦</span>
        Т-Банк
      </button>
      <button onclick="loginGosuslugi()" 
              style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 16px; background: white; border: 2px solid #3b82f6; border-radius: 50px; font-size: 16px; font-weight: 600; color: #1f2937; cursor: pointer; transition: all 0.3s;"
              onmouseover="this.style.background='#eff6ff'"
              onmouseout="this.style.background='white'">
        <span style="font-size: 24px;">🏛️</span>
        Госуслуги
      </button>
    </div>

    <!-- Итоговая информация -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 16px;">
      <div>
        <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Вы возвращаете</div>
        <div style="font-size: 20px; font-weight: 700; color: #1f2937;" id="return-amount">
          10 000 ₽
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">До (включительно)</div>
        <div style="font-size: 16px; font-weight: 600; color: #1f2937;" id="return-date">
          3 октября, 2025
        </div>
      </div>
    </div>

    <!-- Промокод -->
    <div style="text-align: center;">
      <button onclick="togglePromo()" 
              style="background: none; border: none; border-bottom: 2px dashed #9ca3af; color: #6b7280; font-size: 16px; cursor: pointer; padding: 0; transition: all 0.3s;"
              onmouseover="this.style.color='#1f2937'"
              onmouseout="this.style.color='#6b7280'">
        У меня есть промокод
      </button>
      <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #e5e7eb; border-radius: 50%; color: #6b7280; margin-left: 8px; font-size: 18px; cursor: pointer;">
        ?
      </span>
    </div>

  </div>
</div>

<style>
/* Стили для ползунков */
#loan-calculator-widget input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
}

#loan-calculator-widget input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.3s;
}

#loan-calculator-widget input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

#loan-calculator-widget input[type="range"]::-webkit-slider-thumb:active {
  transform: scale(0.95);
}

#loan-calculator-widget input[type="range"]::-moz-range-thumb {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.3s;
}

#loan-calculator-widget input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

#loan-calculator-widget input[type="range"]::-moz-range-thumb:active {
  transform: scale(0.95);
}

#loan-calculator-widget input[type="range"]::-moz-range-track {
  height: 8px;
  background: #e5e7eb;
  border-radius: 10px;
  border: none;
}

/* Компактная мобильная версия */
@media (max-width: 768px) {
  #loan-calculator-widget > div {
    padding: 20px !important;
    border-radius: 16px !important;
  }
  #loan-calculator-widget div[style*="margin-bottom: 32px"] {
    margin-bottom: 20px !important;
  }
  #loan-calculator-widget div[style*="font-size: 24px"] {
    font-size: 18px !important;
  }
  #loan-calculator-widget div[style*="padding: 12px 20px"] {
    padding: 8px 14px !important;
    font-size: 18px !important;
  }
  #loan-calculator-widget button[style*="height: 64px"] {
    height: 52px !important;
    font-size: 18px !important;
  }
  #loan-calculator-widget button[style*="padding: 16px"] {
    padding: 12px !important;
    font-size: 14px !important;
  }
  #loan-calculator-widget div[style*="padding: 20px"] {
    padding: 14px !important;
  }
  #loan-calculator-widget div[style*="font-size: 20px"] {
    font-size: 18px !important;
  }
  #loan-calculator-widget div[style*="font-size: 16px"] {
    font-size: 14px !important;
  }
  #loan-calculator-widget div[style*="gap: 16px"] {
    gap: 12px !important;
  }
}
</style>

<script>
// Калькулятор займов - JavaScript
let currentAmount = 10000;
let currentTerm = 7;

function calculateLoan() {
  const returnAmount = currentAmount;
  
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + currentTerm);
  
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const formattedDate = returnDate.getDate() + ' ' + months[returnDate.getMonth()] + ', ' + returnDate.getFullYear();
  
  // Обновляем интерфейс
  document.getElementById('amount-display').textContent = currentAmount.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('term-display').textContent = currentTerm + ' дней';
  document.getElementById('return-amount').textContent = returnAmount.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('return-date').textContent = formattedDate;
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
  window.open('https://www.money-financei.ru/theapplicationisoffline', '_blank');
}

function loginTBank() {
  alert('Авторизация через Т-Банк ID');
}

function loginGosuslugi() {
  alert('Авторизация через Госуслуги');
}

function togglePromo() {
  alert('Введите промокод');
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
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