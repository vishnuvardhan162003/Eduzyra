import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ShieldCheck, Loader2 } from 'lucide-react'
import { fetchCourseById } from '../services/courseService'
import { createOrder, processPayment } from '../services/paymentService'
import { useAuth } from '../hooks/useAuth'
import OrderSummary from '../components/checkout/OrderSummary'
import CouponField from '../components/checkout/CouponField'
import PaymentMethodPicker from '../components/checkout/PaymentMethodPicker'
import Spinner from '../components/common/Spinner'

export default function Checkout() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { enrollInCourse } = useAuth()

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [method, setMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [coupon, setCoupon] = useState({ valid: false, discount: 0, finalPrice: 0 })
  const [agreed, setAgreed] = useState(false)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCourseById(courseId).then((result) => {
      setCourse(result)
      setCoupon({ valid: false, discount: 0, finalPrice: result?.price ?? 0 })
      setLoading(false)
    })
  }, [courseId])

  if (loading) return <Spinner label="Loading checkout" />
  if (!course) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-lg font-semibold">Course not found</p>
        <Link to="/courses" className="btn-primary mt-4 inline-flex">Back to courses</Link>
      </div>
    )
  }

  const finalPrice = coupon.valid ? coupon.finalPrice : course.price

  const handlePayNow = async (event) => {
    event.preventDefault()
    setError('')

    if (!agreed) {
      setError('Please accept the terms and conditions to continue.')
      return
    }
    if (method === 'card' && cardNumber.trim().length < 4) {
      setError('Enter a valid card number.')
      return
    }

    setPaying(true)
    const order = await createOrder({ courseId: course.id, amount: finalPrice })
    const result = await processPayment({ orderId: order.orderId, cardNumber })
    setPaying(false)

    if (result.success) {
      enrollInCourse(course.id)
      navigate('/payment/success', {
        state: { course, transactionId: result.transactionId, amount: finalPrice },
      })
    } else {
      navigate('/payment/failed', { state: { course } })
    }
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <span className="eyebrow">Checkout</span>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Complete your enrollment</h1>

      <form onSubmit={handlePayNow} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="card-surface flex flex-col gap-6 p-6">
          <CouponField price={course.price} onApplied={setCoupon} />

          <PaymentMethodPicker selected={method} onSelect={setMethod} />

          {method === 'card' && (
            <div>
              <label htmlFor="card" className="mb-1.5 block font-display text-sm font-medium">
                Card number
              </label>
              <input
                id="card"
                inputMode="numeric"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                placeholder="4242 4242 4242 4242"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
              />
              <p className="mt-1.5 text-xs text-slate-400">
                Demo mode: a card number ending in 0000 simulates a failed payment.
              </p>
            </div>
          )}

          <label className="flex items-start gap-2.5 text-sm text-slate-500">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-navy"
            />
            I agree to the Terms of Service and Refund Policy.
          </label>

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <button type="submit" disabled={paying} className="btn-primary w-full disabled:opacity-70">
            {paying ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
            {paying ? 'Verifying payment…' : `Pay ${finalPrice ? '' : ''}Now`}
          </button>
        </div>

        <OrderSummary course={course} discount={coupon.valid ? coupon.discount : 0} finalPrice={finalPrice} />
      </form>
    </div>
  )
}
