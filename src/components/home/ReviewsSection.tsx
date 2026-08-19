import React, { useState } from 'react';
import type { Review } from '../../types';
import { Star, CheckCircle, MessageSquarePlus, Users, GraduationCap } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview?: (newReview: Partial<Review>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [filterRole, setFilterRole] = useState<'all' | 'Enseignant' | 'Élève'>('all');
  const [formData, setFormData] = useState({
    author: '',
    role: 'Étudiant' as Review['role'],
    rating: 5,
    title: '',
    comment: ''
  });

  const filteredReviews = reviews.filter(r => {
    if (filterRole === 'all') return true;
    if (filterRole === 'Enseignant') return r.role === 'Enseignant';
    if (filterRole === 'Élève') return r.role === 'Élève' || r.role === 'Étudiant';
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        author: '',
        role: 'Étudiant',
        rating: 5,
        title: '',
        comment: ''
      });
    }, 2000);
  };

  return (
    <section className="section bg-white border-b border-[#EAECF0]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
              TÉMOIGNAGES CROISÉS PROFESSEURS & ÉLÈVES
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-2">
              Ils enseignent et révisent avec Studykit
            </h2>
            <p className="text-base text-[#667085] max-w-xl">
              Retours authentiques d'enseignants de lycée et collège, d'élèves préparant leurs examens et d'étudiants.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-secondary btn-sm flex items-center gap-1.5 text-xs font-bold"
            >
              <MessageSquarePlus size={15} />
              Déposer un avis vérifié
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setFilterRole('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterRole === 'all'
                ? 'bg-[#111111] text-white'
                : 'bg-[#F5F7FA] text-[#667085] hover:text-[#111111]'
            }`}
          >
            Tous les avis ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRole('Enseignant')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterRole === 'Enseignant'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <Users size={12} />
            Avis Enseignants
          </button>
          <button
            onClick={() => setFilterRole('Élève')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterRole === 'Élève'
                ? 'bg-[#1677FF] text-white'
                : 'bg-blue-50 text-[#1677FF] hover:bg-blue-100'
            }`}
          >
            <GraduationCap size={12} />
            Avis Élèves & Étudiants
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.slice(0, 6).map(review => (
            <div
              key={review.id}
              className="bg-[#FAFBFC] border border-[#EAECF0] rounded-xl p-6 flex flex-col justify-between hover:border-[#D0D5DD] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    review.role === 'Enseignant'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#EBF3FF] text-[#1677FF]'
                  }`}>
                    {review.role === 'Enseignant' ? '👨‍🏫 Enseignant' : '🎓 Élève / Étudiant'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#111111] mb-2 leading-snug">
                  « {review.title} »
                </h4>

                <p className="text-xs text-[#475467] leading-relaxed mb-6">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAECF0] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#111111]">{review.author}</div>
                  <div className="text-[11px] text-[#667085] truncate max-w-[180px]">
                    {review.institution || review.role}
                  </div>
                </div>

                <div className="text-[10px] text-neutral-400 font-mono">
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-neutral-200">
              <h3 className="text-lg font-bold text-[#111111] mb-1">Partagez votre expérience</h3>
              <p className="text-xs text-[#667085] mb-5">
                Votre retour aide la communauté éducative à progresser avec méthode.
              </p>

              {submitted ? (
                <div className="py-8 text-center bg-[#ECFDF3] rounded-lg border border-[#A6F4C5] p-4 text-[#027A48]">
                  <CheckCircle size={28} className="mx-auto mb-2" />
                  <div className="font-bold text-sm">Merci pour votre avis !</div>
                  <div className="text-xs">Il sera vérifié et publié sous 24h.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-group mb-0">
                    <label className="form-label text-xs">Votre nom complet ou prénom</label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={e => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Ex: M. Kouassi / Fatou D."
                      className="form-input text-xs py-2"
                    />
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label text-xs">Votre profil</label>
                    <select
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                      className="form-input text-xs py-2 bg-white"
                    >
                      <option value="Enseignant">Enseignant / Formateur / Professeur</option>
                      <option value="Élève">Élève (Lycée, Collège)</option>
                      <option value="Étudiant">Étudiant (Université, École, Prépa)</option>
                      <option value="Parent d'élève">Parent d'élève</option>
                    </select>
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label text-xs">Note attribuée</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: val })}
                          className={`flex-1 py-1.5 rounded border text-xs font-bold transition-colors ${
                            formData.rating >= val
                              ? 'bg-[#1677FF] text-white border-[#1677FF]'
                              : 'bg-white text-neutral-600 border-neutral-200'
                          }`}
                        >
                          ★ {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label text-xs">Titre de votre avis</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Gain de temps exceptionnel"
                      className="form-input text-xs py-2"
                    />
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label text-xs">Votre retour d'expérience</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.comment}
                      onChange={e => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Comment cet ebook vous a-t-il aidé dans vos cours ou vos révisions ?"
                      className="form-input text-xs py-2"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="btn btn-secondary btn-sm text-xs"
                    >
                      Annuler
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm text-xs font-bold">
                      Envoyer mon avis
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
