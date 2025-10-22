import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'

type Contact = {
  id: number
  name: string
  role?: string
  company?: string
  interests?: string
}

const initialContacts: Contact[] = [
  { id: 1, name: 'Alice Johnson', role: 'Software Engineer', company: 'Tech Co', interests: 'AI, Machine Learning' },
  { id: 2, name: 'Bob Smith', role: 'Product Manager', company: 'Innovate Inc', interests: 'UX Design, Agile' },
  { id: 3, name: 'Charlie Brown', role: 'Marketing Specialist', company: 'Brand Masters', interests: 'Digital Marketing, SEO' },
]


const Networking = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [interests, setInterests] = useState('')

  const addContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    const newContact: Contact = {
      id: Date.now(),
      name: name.trim(),
      role: role.trim(),
      company: company.trim(),
      interests: interests.trim(),
    }
    setContacts((s) => [newContact, ...s])
    setName('')
    setRole('')
    setCompany('')
    setInterests('')
  }

  const initials = (fullName: string) =>
    fullName
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Teal Glow Right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(56, 193, 182, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className='container relative z-10'>
        <div className="min-h-screen w-full relative bg-gradient-to-b flex flex-col items-center pt-24 pb-20 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Event Networking</h1>

          <div className="w-full max-w-4xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contacts List */}
            <div className="bg-black/80 rounded-xl p-6 shadow-lg border border-black/40">
              <h2 className="text-xl text-white font-semibold mb-2">Your Contacts</h2>
              <p className="text-sm text-slate-300 mb-4">People you've met at events</p>

              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={c.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
                        {initials(c.name)}
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{c.name}</div>
                      <div className="text-sm text-slate-400">
                        {c.role ? `${c.role} at ` : ''}
                        <span className="font-medium text-slate-300">{c.company}</span>
                      </div>
                      {c.interests && <div className="text-xs text-slate-500 mt-1">Interests: {c.interests}</div>}
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && <div className="text-slate-400">No contacts yet — add someone using the form.</div>}
              </div>
            </div>

            {/* Add Contact Form */}
            <div className="bg-black/80 rounded-xl p-6 shadow-lg border border-black/40">
              <h2 className="text-xl text-white font-semibold mb-2">Add New Contact</h2>
              <p className="text-sm text-slate-300 mb-4">Keep track of people you meet</p>

              <form onSubmit={addContact} className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 block mb-1">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 text-white rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 block mb-1">Role</label>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-black/60 text-white rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none"
                    placeholder="e.g. Product Manager"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 block mb-1">Company</label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-black/60 text-white rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 block mb-1">Interests</label>
                  <textarea
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    rows={4}
                    className="w-full bg-black/60 text-white rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none resize-none"
                    placeholder="e.g. UX, Marketing"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black rounded-md py-2 flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer"
                >
                  <PlusCircle size={16} /> Add Contact
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Networking