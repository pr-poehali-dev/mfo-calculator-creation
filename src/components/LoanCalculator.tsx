import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface PaymentSchedule {
  day: number;
  date: string;
  amount: number;
  interest: number;
  total: number;
}

interface LoanCalculation {
  loanAmount: number;
  dailyRate: number;
  term: number;
  totalInterest: number;
  totalAmount: number;
  dailyPayment: number;
  schedule: PaymentSchedule[];
}

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [term, setTerm] = useState<number>(14);
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);
  const [showApplication, setShowApplication] = useState(false);

  // Параметры МФО
  const DAILY_RATE = 0.015; // 1.5% в день
  const MAX_AMOUNT = 15000;
  const MAX_TERM = 14;

  const calculateLoan = () => {
    if (loanAmount <= 0 || term <= 0) return;

    const totalInterest = loanAmount * DAILY_RATE * term;
    const totalAmount = loanAmount + totalInterest;
    const dailyPayment = totalAmount / term;

    const schedule: PaymentSchedule[] = [];
    const startDate = new Date();

    for (let day = 1; day <= term; day++) {
      const paymentDate = new Date(startDate);
      paymentDate.setDate(startDate.getDate() + day);
      
      const interest = loanAmount * DAILY_RATE;
      const principal = dailyPayment - interest;

      schedule.push({
        day,
        date: paymentDate.toLocaleDateString('ru-RU'),
        amount: Math.round(principal),
        interest: Math.round(interest),
        total: Math.round(dailyPayment)
      });
    }

    setCalculation({
      loanAmount,
      dailyRate: DAILY_RATE,
      term,
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      dailyPayment: Math.round(dailyPayment),
      schedule
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, term]);

  const generateEmbedCode = () => {
    return `<!-- Калькулятор займов МФО - Полноэкранная версия -->
<div style="width: 100%; min-height: 100vh; margin: 0; padding: 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
<div style="width: 100%; max-width: 800px; margin: 0 auto;">
  <div style="background: #ffffff; border-radius: 20px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15); padding: 40px; border: 1px solid #f1f5f9; min-height: 90vh; display: flex; flex-direction: column; justify-content: center;">
    
    <!-- Заголовок -->
    <div style="text-align: center; margin-bottom: 48px;">
      <h2 style="color: #1e40af; font-size: 36px; font-weight: 700; margin: 0 0 12px 0; line-height: 1.2;">
        Рассчитайте свой займ
      </h2>
      <p style="color: #64748b; margin: 0; font-size: 20px;">Выберите удобную сумму и срок</p>
    </div>
    
    <!-- Сумма займа -->
    <div style="margin-bottom: 32px;">
      <div style="text-align: center; margin-bottom: 16px;">
        <label style="font-size: 18px; font-weight: 600; color: #374151; display: block; margin-bottom: 8px;">
          Сумма займа
        </label>
        <div style="font-size: 32px; font-weight: 700; color: #1e40af;" id="displayAmount">10 000 ₽</div>
      </div>
      <div style="padding: 0 20px;">
        <input 
          type="range" 
          min="1000" 
          max="15000" 
          step="500"
          value="10000"
          style="width: 100%; height: 12px; background: linear-gradient(to right, #1e40af 0%, #1e40af 60%, #e2e8f0 60%, #e2e8f0 100%); border-radius: 12px; outline: none; -webkit-appearance: none;"
          oninput="updateAmount(this.value)"
          id="loanAmountSlider"
        />
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 18px; color: #64748b; margin-top: 16px; padding: 0 20px;">
        <span>1 000 ₽</span>
        <span>15 000 ₽</span>
      </div>
    </div>
    
    <!-- Срок займа -->
    <div style="margin-bottom: 32px;">
      <div style="text-align: center; margin-bottom: 16px;">
        <label style="font-size: 18px; font-weight: 600; color: #374151; display: block; margin-bottom: 8px;">
          Срок займа
        </label>
        <div style="font-size: 32px; font-weight: 700; color: #1e40af;" id="displayTerm">14 дней</div>
      </div>
      <div style="padding: 0 20px;">
        <input 
          type="range" 
          min="1" 
          max="14" 
          step="1"
          value="14"
          style="width: 100%; height: 12px; background: linear-gradient(to right, #1e40af 0%, #1e40af 100%, #e2e8f0 100%, #e2e8f0 100%); border-radius: 12px; outline: none; -webkit-appearance: none;"
          oninput="updateTerm(this.value)"
          id="termSlider"
        />
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 18px; color: #64748b; margin-top: 16px; padding: 0 20px;">
        <span>1 день</span>
        <span>14 дней</span>
      </div>
    </div>
    
    <!-- Результат расчета -->
    <div id="results" style="background: linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(34, 197, 94, 0.05) 100%); padding: 32px; border-radius: 20px; border: 2px solid rgba(30, 64, 175, 0.2);">
      <div style="text-align: center;">
        
        <div style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); padding: 32px; border-radius: 20px; border: 2px solid rgba(255, 255, 255, 0.5); margin-bottom: 32px;">
          <div style="font-size: 22px; color: #64748b; margin-bottom: 16px;" id="returnDate">К возврату 05.10.2024</div>
          <div style="font-size: 56px; font-weight: 700; color: #1e40af; line-height: 1;" id="resultTotal">12 100 ₽</div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; background: rgba(255, 255, 255, 0.5); padding: 24px; border-radius: 16px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 20px; color: #64748b;">
            <span style="font-size: 24px;">%</span>
            <span>Ставка 1,5% в день</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 20px; color: #64748b;">
            <span style="font-size: 24px;">🛡️</span>
            <span>Без комиссий</span>
          </div>
        </div>
        
        <button 
          onclick="submitApplication()"
          style="width: 100%; height: 72px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; border: none; border-radius: 20px; font-size: 28px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 12px 30px rgba(30, 64, 175, 0.3);"
          onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 16px 40px rgba(30, 64, 175, 0.4)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 12px 30px rgba(30, 64, 175, 0.3)'"
        >
          📤 Получить займ сейчас
        </button>
      </div>
    </div>
  </div>
</div>
<script>
// Калькулятор займов - JavaScript функции
function updateAmount(value) {
  document.getElementById('displayAmount').textContent = parseInt(value).toLocaleString('ru-RU') + ' ₽';
  calculateLoan();
}

function updateTerm(value) {
  const days = parseInt(value);
  const dayText = days === 1 ? 'день' : days < 5 ? 'дня' : 'дней';
  document.getElementById('displayTerm').textContent = days + ' ' + dayText;
  calculateLoan();
}

function calculateLoan() {
  const amount = parseInt(document.getElementById('loanAmountSlider').value) || 10000;
  const days = parseInt(document.getElementById('termSlider').value) || 14;
  const rate = 0.015;
  
  const interest = Math.round(amount * rate * days);
  const total = amount + interest;
  
  // Рассчитываем дату возврата
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + days);
  const formattedDate = returnDate.toLocaleDateString('ru-RU');
  
  // Обновляем результаты
  document.getElementById('resultTotal').textContent = total.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('returnDate').textContent = 'К возврату ' + formattedDate;
  
  // Обновляем градиенты слайдеров
  const amountPercent = ((amount - 1000) / (15000 - 1000)) * 100;
  const termPercent = ((days - 1) / (14 - 1)) * 100;
  
  document.getElementById('loanAmountSlider').style.background = 
    'linear-gradient(to right, #1e40af 0%, #1e40af ' + amountPercent + '%, #e2e8f0 ' + amountPercent + '%, #e2e8f0 100%)';
  document.getElementById('termSlider').style.background = 
    'linear-gradient(to right, #1e40af 0%, #1e40af ' + termPercent + '%, #e2e8f0 ' + termPercent + '%, #e2e8f0 100%)';
}

function submitApplication() {
  // Открываем форму заявки
  window.open('https://www.money-financei.ru/theapplicationisoffline', '_blank');
}

// Инициализация калькулятора при загрузке
document.addEventListener('DOMContentLoaded', function() {
  calculateLoan();
});
</script>

<!-- Стили для слайдеров -->
<style>
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1e40af;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  div[style*="max-width: 800px"] {
    padding: 10px !important;
  }
  div[style*="min-height: 90vh"] {
    min-height: 100vh !important;
    padding: 20px !important;
  }
  div[style*="font-size: 56px"] {
    font-size: 40px !important;
  }
  div[style*="font-size: 28px"] {
    font-size: 20px !important;
  }
  div[style*="font-size: 22px"] {
    font-size: 18px !important;
  }
  button[style*="height: 72px"] {
    height: 60px !important;
    font-size: 22px !important;
  }
  div[style*="flex-direction: column"] {
    gap: 12px !important;
  }
}
</style>`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0 md:p-4 flex flex-col">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in p-4 md:p-0 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Калькулятор займов МФО</h1>
          <p className="text-gray-600 text-sm md:text-base">Экспресс займы до 15 000 ₽ на срок до 14 дней</p>
        </div>

        <Tabs defaultValue="calculator" className="w-full h-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto md:mb-6">
            <TabsTrigger value="calculator" className="md:text-base">
              <Icon name="Calculator" size={16} className="mr-2" />
              Калькулятор
            </TabsTrigger>
            <TabsTrigger value="embed" className="md:text-base">
              <Icon name="Code" size={16} className="mr-2" />
              Код
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="flex-1 flex flex-col h-full">
            <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto px-4 pb-4 md:pb-8">
              {/* Калькулятор */}
              <Card className="animate-scale-in flex-1 flex flex-col h-full min-h-[calc(100vh-120px)] md:min-h-0 border-0 md:border shadow-none md:shadow-sm">
                <CardHeader className="text-center pb-4 md:pb-8 px-4 md:px-6 pt-4 md:pt-6">
                  <CardTitle className="text-2xl md:text-4xl font-bold text-primary">
                    Рассчитайте свой займ
                  </CardTitle>
                  <p className="text-gray-600 mt-2 text-base md:text-xl">Выберите удобную сумму и срок</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center space-y-8 md:space-y-16 px-4 md:px-8 pb-6 md:pb-8">
                  <div className="flex-1 flex flex-col justify-evenly space-y-6 md:space-y-16">
                    {/* Сумма займа */}
                    <div className="space-y-4 md:space-y-6">
                      <div className="text-center">
                        <Label className="text-xl md:text-3xl font-semibold text-gray-700 block mb-3 md:mb-4">Сумма займа</Label>
                        <div className="text-4xl md:text-6xl font-bold text-primary">
                          {loanAmount.toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                      <div className="px-2 md:px-4">
                        <Slider
                          value={[loanAmount]}
                          onValueChange={(value) => setLoanAmount(value[0])}
                          min={1000}
                          max={MAX_AMOUNT}
                          step={500}
                          className="w-full h-3 md:h-6"
                        />
                      </div>
                      <div className="flex justify-between text-base md:text-xl text-gray-500 px-2 md:px-4">
                        <span>1 000 ₽</span>
                        <span>15 000 ₽</span>
                      </div>
                    </div>

                    {/* Срок займа */}
                    <div className="space-y-4 md:space-y-6">
                      <div className="text-center">
                        <Label className="text-xl md:text-3xl font-semibold text-gray-700 block mb-3 md:mb-4">Срок займа</Label>
                        <div className="text-4xl md:text-6xl font-bold text-primary">
                          {term} {term === 1 ? 'день' : term < 5 ? 'дня' : 'дней'}
                        </div>
                      </div>
                      <div className="px-2 md:px-4">
                        <Slider
                          value={[term]}
                          onValueChange={(value) => setTerm(value[0])}
                          min={1}
                          max={MAX_TERM}
                          step={1}
                          className="w-full h-3 md:h-6"
                        />
                      </div>
                      <div className="flex justify-between text-base md:text-xl text-gray-500 px-2 md:px-4">
                        <span>1 день</span>
                        <span>14 дней</span>
                      </div>
                    </div>
                  </div>

                  {/* Результат расчета */}
                  {calculation && (
                    <div className="bg-gradient-to-br from-primary/5 via-blue-50 to-green-50 p-6 md:p-10 rounded-xl border-2 border-primary/20">
                      <div className="text-center space-y-6 md:space-y-8">
                        
                        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl border-2 border-white/50">
                          <div className="text-lg md:text-2xl text-gray-600 mb-3 md:mb-4">К возврату {calculation.returnDate}</div>
                          <div className="text-5xl md:text-7xl font-bold text-primary">
                            {calculation.totalAmount.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 md:flex-row md:gap-8 items-center justify-center text-base md:text-xl text-gray-600 bg-white/50 p-4 md:p-6 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Icon name="Percent" size={16} className="md:w-6 md:h-6" />
                            <span>Ставка 1,5% в день</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Shield" size={16} className="md:w-6 md:h-6" />
                            <span>Без комиссий</span>
                          </div>
                        </div>

                        <Button 
                          className="w-full h-16 md:h-24 text-xl md:text-3xl font-semibold" 
                          size="lg"
                          onClick={() => window.open('https://www.money-financei.ru/theapplicationisoffline', '_blank')}
                        >
                          <Icon name="Send" size={24} className="mr-3 md:mr-4 md:w-8 md:h-8" />
                          Получить займ сейчас
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>



          <TabsContent value="embed" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Code" size={20} />
                  Код для встройки на Тильду
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
                    {generateEmbedCode()}
                  </pre>
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => navigator.clipboard.writeText(generateEmbedCode())}
                    variant="outline"
                  >
                    <Icon name="Copy" size={16} className="mr-2" />
                    Копировать код
                  </Button>
                  <Button variant="outline">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать HTML
                  </Button>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-700 font-medium mb-2">
                    <Icon name="Info" size={16} />
                    Инструкция по установке
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
                    <li>Скопируйте код выше</li>
                    <li>В Тильде добавьте блок "HTML-код"</li>
                    <li>Вставьте скопированный код</li>
                    <li>Замените YOUR_APPLICATION_URL на ссылку вашей формы заявки</li>
                    <li>Сохраните и опубликуйте страницу</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Форма заявки */}
        <Dialog open={showApplication} onOpenChange={setShowApplication}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Заявка на займ</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input id="phone" placeholder="+7 (___) ___-__-__" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">ФИО</Label>
                <Input id="name" placeholder="Иванов Иван Иванович" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passport">Паспорт</Label>
                <Input id="passport" placeholder="0000 000000" />
              </div>
              {calculation && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Параметры займа:</div>
                  <div className="space-y-1 text-sm">
                    <div>Сумма: {calculation.loanAmount.toLocaleString('ru-RU')} ₽</div>
                    <div>Срок: {calculation.term} дней</div>
                    <div>К возврату: {calculation.totalAmount.toLocaleString('ru-RU')} ₽</div>
                  </div>
                </div>
              )}
              <Button className="w-full">
                <Icon name="Send" size={16} className="mr-2" />
                Отправить заявку
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LoanCalculator;