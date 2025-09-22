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
    return `<!-- Калькулятор займов МФО -->
<div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Roboto', sans-serif;">
  <div style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 24px;">
    <h2 style="color: #1e40af; font-size: 24px; font-weight: 600; margin-bottom: 20px; text-align: center;">
      Калькулятор займов
    </h2>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">
          Сумма займа (₽)
        </label>
        <input 
          type="number" 
          min="1000" 
          max="15000" 
          value="10000"
          style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 16px;"
          onchange="calculateLoan()"
          id="loanAmount"
        />
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">
          Срок (дней)
        </label>
        <input 
          type="number" 
          min="1" 
          max="14" 
          value="14"
          style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 16px;"
          onchange="calculateLoan()"
          id="term"
        />
      </div>
    </div>
    
    <div id="results" style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        <div style="text-align: center;">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Сумма займа</div>
          <div style="font-size: 20px; font-weight: 600; color: #1e40af;" id="resultAmount">10 000 ₽</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Переплата</div>
          <div style="font-size: 20px; font-weight: 600; color: #dc2626;" id="resultInterest">2 100 ₽</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">К возврату</div>
          <div style="font-size: 20px; font-weight: 600; color: #059669;" id="resultTotal">12 100 ₽</div>
        </div>
      </div>
    </div>
    
    <div style="text-align: center;">
      <button 
        style="background: #1e40af; color: white; padding: 12px 32px; border: none; border-radius: 6px; font-size: 16px; font-weight: 500; cursor: pointer; transition: background 0.2s;"
        onmouseover="this.style.background='#1d4ed8'"
        onmouseout="this.style.background='#1e40af'"
        onclick="window.open('YOUR_APPLICATION_URL', '_blank')"
      >
        Подать заявку
      </button>
    </div>
  </div>
</div>

<script>
function calculateLoan() {
  const amount = parseInt(document.getElementById('loanAmount').value) || 10000;
  const days = parseInt(document.getElementById('term').value) || 14;
  const rate = 0.015;
  
  const interest = Math.round(amount * rate * days);
  const total = amount + interest;
  
  document.getElementById('resultAmount').textContent = amount.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('resultInterest').textContent = interest.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('resultTotal').textContent = total.toLocaleString('ru-RU') + ' ₽';
}
</script>`;
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