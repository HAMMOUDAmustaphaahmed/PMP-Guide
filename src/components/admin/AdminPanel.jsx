import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContentStore } from '../../stores/contentStore'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'
import { useCurrentContent } from '../../hooks/useCurrentContent'
import { useT } from '../../hooks/useT'
import { X, Save, ChevronRight, ChevronDown } from 'lucide-react'

// --- Helper components ---
function AdminField({ label, value, onChange, textarea = false }) {
  return (
    <div className="admin-field">
      {label && <label className="admin-label">{label}</label>}
      {textarea ? (
        <textarea className="admin-input admin-textarea" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="admin-input" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}

function AdminAddBtn({ onClick, label }) {
  return (
    <button type="button" className="admin-add-btn" onClick={onClick}>
      <span style={{ fontSize: 14 }}>+</span> {label}
    </button>
  )
}

function AdminRemoveBtn({ onClick }) {
  return (
    <button type="button" className="admin-remove-btn" onClick={onClick} aria-label="Supprimer">
      ✕
    </button>
  )
}

// --- Hero Editor ---
function HeroEditor() {
  const { updateHero, updateHeroStat, addHeroStat, removeHeroStat, updateHeroPills } = useContentStore()
  const { hero } = useCurrentContent()

  return (
    <div>
      <div className="admin-section-title">Textes principaux</div>
      <AdminField label="Sous-titre (eyebrow)" value={hero.eyebrow} onChange={(v) => updateHero({ eyebrow: v })} />
      <AdminField label="Titre principal" value={hero.title} onChange={(v) => updateHero({ title: v })} />
      <AdminField label="Sous-titre" value={hero.subtitle} onChange={(v) => updateHero({ subtitle: v })} />
      <AdminField label="Description" value={hero.description} onChange={(v) => updateHero({ description: v })} textarea />

      <div className="admin-divider" />
      <div className="admin-section-title">Statistiques</div>
      {hero.stats.map((stat, i) => (
        <div key={i} className="admin-item-row">
          <input
            className="admin-input"
            style={{ width: 70 }}
            value={stat.value}
            onChange={(e) => updateHeroStat(i, { value: e.target.value })}
            placeholder="Valeur"
          />
          <input
            className="admin-input"
            value={stat.label}
            onChange={(e) => updateHeroStat(i, { label: e.target.value })}
            placeholder="Label"
          />
          <AdminRemoveBtn onClick={() => removeHeroStat(i)} />
        </div>
      ))}
      <AdminAddBtn onClick={addHeroStat} label="Ajouter une stat" />

      <div className="admin-divider" />
      <div className="admin-section-title">Pills (séparés par virgule)</div>
      <AdminField
        value={hero.pills.join(', ')}
        onChange={(v) => updateHeroPills(v.split(',').map((s) => s.trim()).filter(Boolean))}
      />
    </div>
  )
}

// --- Section Editor ---
function SectionEditor({ chIdx, secIdx, section }) {
  const {
    updateSection,
    updateTableRow,
    addTableRow,
    removeTableRow,
    updateBoxItem,
    addBoxItem,
    removeBoxItem,
    updateBadgeItem,
    addBadgeItem,
    removeBadgeItem,
    updateKpiItem,
  } = useContentStore()
  const [open, setOpen] = useState(false)

  return (
    <div style={{ marginBottom: 12, border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden' }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          background: '#F8FAFC',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {open ? <ChevronDown size={14} color="#2563EB" /> : <ChevronRight size={14} color="#64748B" />}
        <span style={{ fontSize: 12.5, fontWeight: 600, color: open ? '#2563EB' : '#64748B' }}>{section.heading}</span>
        <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto', background: '#E2E8F0', padding: '2px 8px', borderRadius: 99 }}>{section.type}</span>
      </button>

      {open && (
        <div style={{ padding: '14px 14px 10px' }}>
          <AdminField label="Titre de la section" value={section.heading} onChange={(v) => updateSection(chIdx, secIdx, { heading: v })} />

          <div className="admin-divider" style={{ margin: '10px 0' }} />

          {(() => {
            switch (section.type) {
              case 'text+box':
              case 'box':
                return (
                  <>
                    {section.body !== undefined && (
                      <AdminField label="Corps de texte (**gras**)" value={section.body || ''} onChange={(v) => updateSection(chIdx, secIdx, { body: v })} textarea />
                    )}
                    {section.box && (
                      <>
                        <AdminField label="Titre de la box" value={section.box.title} onChange={(v) => updateSection(chIdx, secIdx, { box: { ...section.box, title: v } })} />
                        <div className="admin-color-row" style={{ marginBottom: 10 }}>
                          <label className="admin-label" style={{ marginBottom: 0 }}>Couleur</label>
                          <input type="color" className="admin-color-input" value={section.box.color} onChange={(e) => updateSection(chIdx, secIdx, { box: { ...section.box, color: e.target.value } })} />
                          <label className="admin-label" style={{ marginBottom: 0, marginLeft: 8 }}>Fond</label>
                          <input type="color" className="admin-color-input" value={section.box.bg} onChange={(e) => updateSection(chIdx, secIdx, { box: { ...section.box, bg: e.target.value } })} />
                        </div>
                        <div className="admin-sub-label">Éléments (**gras** supporté)</div>
                        {section.box.items.map((item, i) => (
                          <div key={i} className="admin-item-row">
                            <input className="admin-input" value={item} onChange={(e) => updateBoxItem(chIdx, secIdx, i, e.target.value)} />
                            <AdminRemoveBtn onClick={() => removeBoxItem(chIdx, secIdx, i)} />
                          </div>
                        ))}
                        <AdminAddBtn onClick={() => addBoxItem(chIdx, secIdx)} label="Ajouter un élément" />
                      </>
                    )}
                  </>
                )
              case 'table':
                return (
                  <>
                    <div className="admin-sub-label">En-têtes (séparés par |)</div>
                    <AdminField value={section.headers.join(' | ')} onChange={(v) => updateSection(chIdx, secIdx, { headers: v.split('|').map(s => s.trim()) })} />
                    <div className="admin-sub-label">Lignes</div>
                    {section.rows.map((row, i) => (
                      <div key={i} className="admin-item-row" style={{ flexWrap: 'wrap' }}>
                        {row.map((cell, j) => (
                          <input
                            key={j}
                            className="admin-input"
                            style={{ flex: '1 1 100px', minWidth: 80 }}
                            value={cell}
                            onChange={(e) => {
                              const newRow = [...row]
                              newRow[j] = e.target.value
                              updateTableRow(chIdx, secIdx, i, newRow)
                            }}
                          />
                        ))}
                        <AdminRemoveBtn onClick={() => removeTableRow(chIdx, secIdx, i)} />
                      </div>
                    ))}
                    <AdminAddBtn onClick={() => addTableRow(chIdx, secIdx)} label="Ajouter une ligne" />
                  </>
                )
              case 'badges':
              case 'swot':
                return (
                  <>
                    {section.items.map((item, i) => (
                      <div key={i} style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 12px 8px', marginBottom: 10, border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                          <div style={{ flex: 1 }}>
                            <AdminField label="Titre" value={item.title} onChange={(v) => updateBadgeItem(chIdx, secIdx, i, { title: v })} />
                            <AdminField label="Description (**gras**)" value={item.desc} onChange={(v) => updateBadgeItem(chIdx, secIdx, i, { desc: v })} textarea />
                            <div className="admin-color-row">
                              <label className="admin-label" style={{ marginBottom: 0 }}>Couleur</label>
                              <input type="color" className="admin-color-input" value={item.color} onChange={(e) => updateBadgeItem(chIdx, secIdx, i, { color: e.target.value })} />
                              <label className="admin-label" style={{ marginBottom: 0, marginLeft: 8 }}>Fond</label>
                              <input type="color" className="admin-color-input" value={item.bg} onChange={(e) => updateBadgeItem(chIdx, secIdx, i, { bg: e.target.value })} />
                            </div>
                          </div>
                          <AdminRemoveBtn onClick={() => removeBadgeItem(chIdx, secIdx, i)} />
                        </div>
                      </div>
                    ))}
                    <AdminAddBtn onClick={() => addBadgeItem(chIdx, secIdx)} label="Ajouter un badge" />
                  </>
                )
              case 'phases':
                return (
                  <>
                    {section.items.map((item, i) => (
                      <div key={i} style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 12px 8px', marginBottom: 8, border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <AdminField label="Label" value={item.label} onChange={(v) => updateBadgeItem(chIdx, secIdx, i, { label: v })} />
                            <AdminField label="Description" value={item.desc} onChange={(v) => updateBadgeItem(chIdx, secIdx, i, { desc: v })} textarea />
                            <div className="admin-color-row">
                              <label className="admin-label" style={{ marginBottom: 0 }}>Couleur</label>
                              <input type="color" className="admin-color-input" value={item.color} onChange={(e) => updateBadgeItem(chIdx, secIdx, i, { color: e.target.value })} />
                            </div>
                          </div>
                          <AdminRemoveBtn onClick={() => removeBadgeItem(chIdx, secIdx, i)} />
                        </div>
                      </div>
                    ))}
                    <AdminAddBtn onClick={() => addBadgeItem(chIdx, secIdx)} label="Ajouter une phase" />
                  </>
                )
              case 'kpi':
                return (
                  <>
                    {section.items.map((item, i) => (
                      <div key={i} style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 12px 8px', marginBottom: 8, border: '1px solid #E2E8F0' }}>
                        <AdminField label="Label" value={item.label} onChange={(v) => updateKpiItem(chIdx, secIdx, i, { label: v })} />
                        <AdminField label="Valeur affichée" value={item.value} onChange={(v) => updateKpiItem(chIdx, secIdx, i, { value: v })} />
                        <div className="admin-color-row">
                          <label className="admin-label" style={{ marginBottom: 0 }}>Couleur</label>
                          <input type="color" className="admin-color-input" value={item.color} onChange={(e) => updateKpiItem(chIdx, secIdx, i, { color: e.target.value })} />
                          <label className="admin-label" style={{ marginBottom: 0, marginLeft: 8 }}>Fond</label>
                          <input type="color" className="admin-color-input" value={item.bg} onChange={(e) => updateKpiItem(chIdx, secIdx, i, { bg: e.target.value })} />
                        </div>
                      </div>
                    ))}
                  </>
                )
              case 'risk-matrix':
                return (
                  <p style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>
                    La matrice de risques est générée automatiquement et n'est pas modifiable.
                  </p>
                )
              default:
                return (
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>
                    Type de section non éditable : {section.type}
                  </p>
                )
            }
          })()}
        </div>
      )}
    </div>
  )
}

// --- Chapter Editor ---
function ChapterEditor({ chapter, index }) {
  const { updateChapter } = useContentStore()
  const [open, setOpen] = useState(false)

  return (
    <div style={{ marginBottom: 10, border: '2px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          background: open ? '#fff' : `${chapter.accent}12`,
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          borderLeft: `4px solid ${chapter.accent}`,
        }}
      >
        {open ? <ChevronDown size={15} color={chapter.accent} /> : <ChevronRight size={15} color={chapter.accent} />}
        <div style={{ width: 28, height: 28, borderRadius: 6, background: chapter.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>{chapter.num}</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: open ? '#1E293B' : chapter.accent }}>{chapter.title}</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>{chapter.sections.length} sections</span>
      </button>

      {open && (
        <div style={{ padding: '16px', borderTop: '1px solid #E2E8F0' }}>
          <AdminField label="Titre du chapitre" value={chapter.title} onChange={(v) => updateChapter(index, { title: v })} />
          <AdminField label="Description" value={chapter.desc} onChange={(v) => updateChapter(index, { desc: v })} />
          <div className="admin-color-row" style={{ marginBottom: 14 }}>
            <label className="admin-label" style={{ marginBottom: 0 }}>Couleur accent</label>
            <input type="color" className="admin-color-input" value={chapter.accent} onChange={(e) => updateChapter(index, { accent: e.target.value })} />
          </div>
          <div className="admin-divider" style={{ margin: '12px 0' }} />
          <div className="admin-section-title" style={{ fontSize: 12, marginBottom: 10 }}>Sections</div>
          {chapter.sections.map((section, i) => (
            <SectionEditor key={section.id} chIdx={index} secIdx={i} section={section} />
          ))}
        </div>
      )}
    </div>
  )
}

// --- Annexes Editor ---
function AnnexesEditor() {
  const { updateGlossaryRow, addGlossaryRow, removeGlossaryRow, updateChecklistItem, addChecklistItem, removeChecklistItem } = useContentStore()
  const { glossary, checklist } = useCurrentContent().annexes

  return (
    <div>
      <div className="admin-section-title">Glossaire</div>
      {glossary.map((row, i) => (
        <div key={i} className="admin-item-row">
          <input
            className="admin-input"
            style={{ flex: '0 0 120px' }}
            value={row[0]}
            onChange={(e) => {
              const newRow = [...row]
              newRow[0] = e.target.value
              updateGlossaryRow(i, newRow)
            }}
            placeholder="Terme"
          />
          <input
            className="admin-input"
            value={row[1]}
            onChange={(e) => {
              const newRow = [...row]
              newRow[1] = e.target.value
              updateGlossaryRow(i, newRow)
            }}
            placeholder="Définition"
          />
          <AdminRemoveBtn onClick={() => removeGlossaryRow(i)} />
        </div>
      ))}
      <AdminAddBtn onClick={addGlossaryRow} label="Ajouter un terme" />

      <div className="admin-divider" />
      <div className="admin-section-title">Checklist</div>
      {checklist.map((item, i) => (
        <div key={i} className="admin-item-row">
          <input
            className="admin-input"
            value={item}
            onChange={(e) => updateChecklistItem(i, e.target.value)}
          />
          <AdminRemoveBtn onClick={() => removeChecklistItem(i)} />
        </div>
      ))}
      <AdminAddBtn onClick={addChecklistItem} label="Ajouter un élément" />
    </div>
  )
}

// --- Main AdminPanel ---
export function AdminPanel() {
  const { t, language } = useT()
  const isAdmin = useAuthStore((s) => s.isAdmin)
  const isOpen = useUiStore((s) => s.adminPanelOpen) && isAdmin
  const setOpen = useUiStore((s) => s.setAdminPanelOpen)
  const saveToServer = useContentStore((s) => s.saveToServer)
  const isDirty = useContentStore((s) => !!s.dirty[language])
  const { chapters } = useCurrentContent()
  const [activeTab, setActiveTab] = useState(0)
  const [toast, setToast] = useState(null) // null | { ok: boolean, text: string }
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, setOpen])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const tabs = [t('hero'), t('chapters'), t('annexes')]

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveToServer()
      setToast({ ok: true, text: t('saved') })
    } catch (error) {
      setToast({ ok: false, text: error.status === 401 ? t('sessionExpired') : t('saveError') })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="admin-panel-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="admin-panel"
              role="dialog"
              aria-label={t('editContent')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 38 }}
            >
              <div className="admin-panel-header">
                <div>
                  <div className="admin-panel-title">{t('editContent')}</div>
                  <div className="admin-panel-sub" role="status">
                    {isDirty ? t('unsaved') : t('upToDate')} · {language.toUpperCase()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" className="admin-save-btn" onClick={handleSave} disabled={saving || !isDirty}>
                    <Save size={14} aria-hidden="true" /> {saving ? t('saving') : t('save')}
                  </button>
                  <button type="button" className="admin-panel-close" onClick={() => setOpen(false)} aria-label={t('close')}>
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="admin-tabs" role="tablist">
                {tabs.map((label, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === i}
                    className={`admin-tab ${activeTab === i ? 'active' : ''}`}
                    onClick={() => setActiveTab(i)}
                  >
                    {label}
                    {activeTab === i && <motion.span layoutId="admin-tab-line" className="admin-tab-line" />}
                  </button>
                ))}
              </div>

              <div className="admin-body" role="tabpanel">
                {activeTab === 0 && <HeroEditor />}
                {activeTab === 1 && chapters.map((chapter, i) => (
                  <ChapterEditor key={chapter.id} chapter={chapter} index={i} />
                ))}
                {activeTab === 2 && <AnnexesEditor />}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className={`admin-save-toast ${toast.ok ? '' : 'error'}`}
            role={toast.ok ? 'status' : 'alert'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
