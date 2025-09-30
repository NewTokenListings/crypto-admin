import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useSupabaseTable({ table, select = '*', order = { column: 'created_at', ascending: false } }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchData() {
    setLoading(true)
    setError(null)
    let query = supabase.from(table).select(select)
    if (order?.column) {
      query = query.order(order.column, { ascending: !!order.ascending })
    }
    const { data: d, error: err } = await query.limit(100)
    if (err) setError(err)
    setData(d ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [table, select, order?.column, order?.ascending])

  return { data, loading, error, refresh: fetchData }
}
