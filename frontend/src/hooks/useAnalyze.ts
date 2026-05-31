import { useState } from 'react'
import axios from 'axios'
import type { AnalyzeRequest, AnalyzeResponse } from '../types'

export function useAnalyze() {
  const [result, setResult] = useState<AnalyzeResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<number>(-1)

  const analyze = async (req: AnalyzeRequest) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      setStep(0)
      await delay(200)
      setStep(1)
      await delay(300)
      setStep(2)

      const res = await axios.post<AnalyzeResponse>('/api/analyze', req)
      setResult(res.data)
      setStep(3)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.detail || e.message)
      } else {
        setError('分析失敗，請稍後再試')
      }
      setStep(-1)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
    setStep(-1)
  }

  return { result, loading, error, step, analyze, reset }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
