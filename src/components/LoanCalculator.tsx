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
    return `<!-- Калькулятор займов МФО - Обновленная версия -->
<div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
  <div style="background: #ffffff; border-radius: 16px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); padding: 32px; border: 1px solid #f1f5f9;">
    
    <!-- Заголовок -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h2 style="color: #1e40af; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">
        Рассчитайте свой займ
      </h2>
      <p style="color: #64748b; margin: 0; font-size: 16px;">Выберите удобную сумму и срок</p>
    </div>
    
    <!-- Сумма займа -->
    <div style="margin-bottom: 32px;">
      <div style="text-align: center; margin-bottom: 16px;">
        <label style="font-size: 18px; font-weight: 600; color: #374151; display: block; margin-bottom: 8px;">
          Сумма займа
        </label>
        <div style="font-size: 32px; font-weight: 700; color: #1e40af;" id="displayAmount">10 000 ₽</div>
      </div>
      <input 
        type="range" 
        min="1000" 
        max="15000" 
        step="500"
        value="10000"
        style="width: 100%; height: 8px; background: linear-gradient(to right, #1e40af 0%, #1e40af 60%, #e2e8f0 60%, #e2e8f0 100%); border-radius: 8px; outline: none; -webkit-appearance: none;"
        oninput="updateAmount(this.value)"
        id="loanAmountSlider"
      />
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #64748b; margin-top: 8px;">
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
      <input 
        type="range" 
        min="1" 
        max="14" 
        step="1"
        value="14"
        style="width: 100%; height: 8px; background: linear-gradient(to right, #1e40af 0%, #1e40af 100%, #e2e8f0 100%, #e2e8f0 100%); border-radius: 8px; outline: none; -webkit-appearance: none;"
        oninput="updateTerm(this.value)"
        id="termSlider"
      />
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #64748b; margin-top: 8px;">
        <span>1 день</span>
        <span>14 дней</span>
      </div>
    </div>
    
    <!-- Результат расчета -->
    <div id="results" style="background: linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(34, 197, 94, 0.05) 100%); padding: 24px; border-radius: 16px; border: 2px solid rgba(30, 64, 175, 0.2); margin-bottom: 24px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #1e40af; font-weight: 600; margin-bottom: 16px;">
          <span>🎯</span>
          <span>Результат расчёта</span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div style="text-align: center;">
            <div style="font-size: 14px; color: #64748b; margin-bottom: 4px;">Получите</div>
            <div style="font-size: 24px; font-weight: 700; color: #059669;" id="resultReceive">10 000 ₽</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 14px; color: #64748b; margin-bottom: 4px;">Переплата</div>
            <div style="font-size: 24px; font-weight: 700; color: #ea580c;" id="resultOverpay">2 100 ₽</div>
          </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); padding: 16px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.5);">
          <div style="font-size: 14px; color: #64748b; margin-bottom: 4px;" id="returnDate">К возврату 05.10.2024</div>
          <div style="font-size: 32px; font-weight: 700; color: #1e40af;" id="resultTotal">12 100 ₽</div>
        </div>
        
        <div style="display: flex; justify-content: center; gap: 16px; margin-top: 16px; background: rgba(255, 255, 255, 0.5); padding: 12px; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 4px; font-size: 14px; color: #64748b;">
            <span>%</span>
            <span>Ставка 1,5% в день</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px; font-size: 14px; color: #64748b;">
            <span>🛡️</span>
            <span>Без комиссий</span>
          </div>
        </div>
        
        <button 
          onclick="submitApplication()"
          style="width: 100%; margin-top: 16px; height: 48px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; border: none; border-radius: 8px; font-size: 18px; font-weight: 600; cursor: pointer; transition: transform 0.2s;"
          onmouseover="this.style.transform='scale(1.02)'"
          onmouseout="this.style.transform='scale(1)'"
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
  document.getElementById('resultReceive').textContent = amount.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('resultOverpay').textContent = interest.toLocaleString('ru-RU') + ' ₽';
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
  // Замените YOUR_APPLICATION_URL на ссылку вашей формы заявки
  window.open('YOUR_APPLICATION_URL', '_blank');
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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1e40af;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4);
}

input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1e40af;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

@media (max-width: 640px) {
  div[style*="grid-template-columns: 1fr 1fr"] {
    grid-template-columns: 1fr !important;
  }
}
</style>`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold text-primary">Калькулятор займов МФО</h1>
          <p className="text-gray-600">Экспресс займы до 15 000 ₽ на срок до 14 дней</p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="calculator">
              <Icon name="Calculator" size={16} className="mr-2" />
              Калькулятор
            </TabsTrigger>
            <TabsTrigger value="embed">
              <Icon name="Code" size={16} className="mr-2" />
              Код
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              {/* Калькулятор */}
              <Card className="animate-scale-in">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-primary">
                    Рассчитайте свой займ
                  </CardTitle>
                  <p className="text-gray-600 mt-2">Выберите удобную сумму и срок</p>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-8">
                    {/* Сумма займа */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <Label className="text-lg font-semibold text-gray-700">Сумма займа</Label>
                        <div className="text-4xl font-bold text-primary mt-2">
                          {loanAmount.toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                      <Slider
                        value={[loanAmount]}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        min={1000}
                        max={MAX_AMOUNT}
                        step={500}
                        className="w-full h-3"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>1 000 ₽</span>
                        <span>15 000 ₽</span>
                      </div>
                    </div>

                    {/* Срок займа */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <Label className="text-lg font-semibold text-gray-700">Срок займа</Label>
                        <div className="text-4xl font-bold text-primary mt-2">
                          {term} {term === 1 ? 'день' : term < 5 ? 'дня' : 'дней'}
                        </div>
                      </div>
                      <Slider
                        value={[term]}
                        onValueChange={(value) => setTerm(value[0])}
                        min={1}
                        max={MAX_TERM}
                        step={1}
                        className="w-full h-3"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>1 день</span>
                        <span>14 дней</span>
                      </div>
                    </div>
                  </div>

                  {/* Результат расчета */}
                  {calculation && (
                    <div className="bg-gradient-to-br from-primary/5 via-blue-50 to-green-50 p-6 rounded-xl border-2 border-primary/20">
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                          <Icon name="Target" size={20} />
                          <span>Результат расчёта</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Получите</div>
                            <div className="text-2xl font-bold text-green-600">
                              {calculation.loanAmount.toLocaleString('ru-RU')} ₽
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Переплата</div>
                            <div className="text-2xl font-bold text-orange-600">
                              {calculation.totalInterest.toLocaleString('ru-RU')} ₽
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border">
                          <div className="text-sm text-gray-600 mb-1">К возврату {calculation.returnDate}</div>
                          <div className="text-3xl font-bold text-primary">
                            {calculation.totalAmount.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 bg-white/50 p-3 rounded-lg">
                          <div className="flex items-center gap-1">
                            <Icon name="Percent" size={14} />
                            <span>Ставка 1,5% в день</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Shield" size={14} />
                            <span>Без комиссий</span>
                          </div>
                        </div>

                        <Button 
                          className="w-full mt-4 h-12 text-lg font-semibold" 
                          size="lg"
                          onClick={() => setShowApplication(true)}
                        >
                          <Icon name="Send" size={18} className="mr-2" />
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