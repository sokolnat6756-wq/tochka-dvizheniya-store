import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { CheckCircle2, X } from 'lucide-react';
import type { CheckoutForm } from '../types';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const initial: CheckoutForm = {
  name: '',
  phone: '',
  email: '',
  city: '',
  delivery: 'курьер',
  comment: '',
};

type FieldEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const [form, setForm] = useState<CheckoutForm>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  useEffect(() => {
    if (!open) {
      setForm(initial);
      setSubmitted(false);
      setErrors({});
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const set = (key: keyof CheckoutForm) => (e: FieldEvent) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const validate = () => {
    const next: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.name.trim()) next.name = 'Укажите имя';
    if (!form.phone.trim()) next.phone = 'Укажите телефон';
    if (!form.email.trim() || !form.email.includes('@'))
      next.email = 'Укажите корректный email';
    if (!form.city.trim()) next.city = 'Укажите город';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {submitted ? (
          <div className="checkout-success">
            <CheckCircle2 size={48} />
            <h2 id="checkout-title">Заказ принят!</h2>
            <p>
              Это демонстрационная версия магазина. В полноценном проекте заказ
              будет сохранён и передан менеджеру.
            </p>
            <button type="button" className="btn btn--primary" onClick={onClose}>
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h2 id="checkout-title">Оформление заказа</h2>
            <form className="checkout-form" onSubmit={handleSubmit} noValidate>
              <label>
                Имя
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  autoComplete="name"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </label>
              <label>
                Телефон
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                  placeholder="+7..."
                />
                {errors.phone && (
                  <span className="form-error">{errors.phone}</span>
                )}
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </label>
              <label>
                Город
                <input
                  type="text"
                  value={form.city}
                  onChange={set('city')}
                  autoComplete="address-level2"
                />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </label>
              <label>
                Способ доставки
                <select value={form.delivery} onChange={set('delivery')}>
                  <option value="курьер">Курьер</option>
                  <option value="пункт выдачи">Пункт выдачи</option>
                  <option value="самовывоз">Самовывоз</option>
                </select>
              </label>
              <label>
                Комментарий
                <textarea
                  rows={3}
                  value={form.comment}
                  onChange={set('comment')}
                  placeholder="Пожелания к заказу"
                />
              </label>
              <button type="submit" className="btn btn--primary btn--block">
                Подтвердить заказ
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
