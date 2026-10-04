import React, { useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState('login');
  const [activeTab, setActiveTab] = useState('home');

  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [pendingUsers, setPendingUsers] = useState([{ id: 1, email: 'copain@gmail.com' }]);

  // Vidéos par coach (initialement vides)
  const [coachVideos, setCoachVideos] = useState({
    Nolan: [],
    Zaïd: [],
    Mathys: [],
    Théo: []
  });
  const [vidTitle, setVidTitle] = useState('');
  const [vidUrl, setVidUrl] = useState('');
  const [selectedCoach, setSelectedCoach] = useState('Nolan');

  // Nutrition & Recettes enrichies
  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Porridge Protéiné & Beurre de Cacahuète', desc: 'Idéal pour le fuel matinal : flocons d’avoine, fromage blanc, miel et amandes.', url: '' }
  ]);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDesc, setRecipeDesc] = useState('');
  const [recipeUrl, setRecipeUrl] = useState('');

  // Photos de progression
  const [photos, setPhotos] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');

  // Quiz / Objectifs
  const [quizGoal, setQuizGoal] = useState(null);

  // Conseils détaillés par sport
  const sportsAdvice = [
    { name: 'Football', tips: 'Travail d’appuis, VMA, sprints courts et prévention des ischio-jambiers.' },
    { name: 'Boxe', tips: 'Explosivité des bras, cardio haute intensité, jeu de jambes et gainage dynamique.' },
    { name: 'Jiu-Jitsu Brésilien (JJB)', tips: 'Grip maximal, mobilité des hanches, souplesse et endurance de force.' },
    { name: 'Handball', tips: 'Détente verticale, puissance de tir, résistance des épaules et changements d’appuis.' },
    { name: 'Basketball', tips: 'Plyométrie pour le saut, explosivité, vitesse de déplacement et endurance.' },
    { name: 'Natation', tips: 'Gainage de fer, souplesse des épaules, puissance des jambes et respiration.' },
    { name: 'Escalade', tips: 'Force des doigts, suspension, traction unilatérale et mobilité des hanches.' },
    { name: 'Athlétisme', tips: 'Technique de course, foulée, explosivité pure et renforcement des chevilles.' },
    { name: 'Judo', tips: 'Kumi-kata (saisie), projections explosives, bascule du bassin et résistance.' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'nolan@admin.com' && accessCode === 'STAY2026') {
      setIsAdmin(true);
      setUser({ email, status: 'approved' });
      setView('dashboard');
      return;
    }
    if (accessCode === 'SHAPE123') {
      setUser({ email, status: 'pending' });
      setView('pending');
    } else {
      alert('Code d’accès incorrect !');
    }
  };

  const handleUploadCoachVideo = (e) => {
    e.preventDefault();
    if (!vidTitle || !vidUrl) return;
    setCoachVideos(prev => ({
      ...prev,
      [selectedCoach]: [...prev[selectedCoach], { id: Date.now(), title: vidTitle, url: vidUrl }]
    }));
    setVidTitle('');
    setVidUrl('');
    alert('Vidéo importée avec succès dans l’espace du coach !');
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    if (!recipeTitle) return;
    setRecipes([...recipes, { id: Date.now(), title: recipeTitle, desc: recipeDesc, url: recipeUrl }]);
    setRecipeTitle('');
    setRecipeDesc('');
    setRecipeUrl('');
    alert('Recette ou conseil nutritionnel ajouté !');
  };

  const handleUploadPhoto = (e) => {
    e.preventDefault();
    if (!photoUrl) return;
    setPhotos([...photos, { id: Date.now(), url: photoUrl }]);
    setPhotoUrl('');
    alert('Photo de progression enregistrée !');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030712', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* HEADER AVEC SLOGAN FORT */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderBottom: '1px solid #1f2937', background: '#0b0f19' }}>
        <div>
          <h1 style={{ color: '#ef4444', margin: 0, fontSize: '20px', letterSpacing: '1px', fontWeight: '900' }}>STAY IN SHAPE</h1>
          <p style={{ color: '#f87171', fontSize: '11px', margin: '3px 0 0 0', fontWeight: 'bold' }}>⚡ 4 coachs, 1 mission : te faire progresser ⚡</p>
        </div>
        {user && (
          <button onClick={() => { setUser(null); setView('login'); setIsAdmin(false); }} style={{ background: '#1f2937', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
            Déconnexion
          </button>
        )}
      </header>

      {/* LOGIN */}
      {view === 'login' && (
        <div style={{ maxWidth: '400px', margin: '60px auto', background: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1f2937', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '22px' }}>Espace Sécurisé</h2>
          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px', marginBottom: '20px' }}>Rejoins la communauté Stay in Shape</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre Gmail" style={{ background: '#030712', border: '1px solid #1f2937', padding: '12px', color: '#fff', borderRadius: '8px' }} />
            <input type="password" required value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Code d'accès" style={{ background: '#030712', border: '1px solid #1f2937', padding: '12px', color: '#fff', borderRadius: '8px' }} />
            <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Se connecter</button>
          </form>
        </div>
      )}

      {/* PENDING */}
      {view === 'pending' && (
        <div style={{ textAlign: 'center', marginTop: '80px', padding: '20px' }}>
          <h2 style={{ color: '#eab308' }}>Compte en attente</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Ton accès est en cours de validation par l'administration.</p>
        </div>
      )}

      {/* DASHBOARD */}
      {view === 'dashboard' && (
        <div>
          {/* NAVIGATION TABS PLUS VISIBLES */}
          <div style={{ display: 'flex', overflowX: 'auto', background: '#0b0f19', borderBottom: '1px solid #1f2937', padding: '12px 20px', gap: '10px' }}>
            {[
              { id: 'home', label: '🏠 Accueil & Programmes' },
              { id: 'videos', label: '🎥 Vidéos des Coachs' },
              { id: 'nutrition', label: '🥗 Nutrition & Recettes' },
              { id: 'sports', label: '🥊 Conseils Sports' },
              { id: 'quiz', label: '🎯 Quiz Objectif' },
              { id: 'photos', label: '📸 Photos Progression' }
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: activeTab === tab.id ? '#ef4444' : '#1f2937', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: '1050px', margin: '25px auto', padding: '0 20px' }}>
            
            {/* ADMIN PANEL */}
            {isAdmin && pendingUsers.length > 0 && (
              <div style={{ background: 'rgba(127, 29, 29, 0.2)', border: '1px solid #7f1d1d', padding: '15px', borderRadius: '10px', marginBottom: '25px' }}>
                <h4 style={{ color: '#f87171', margin: '0 0 10px 0', fontSize: '14px' }}>Gestion des accès en attente</h4>
                {pendingUsers.map(u => (
                  <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                    <span>{u.email}</span>
                    <button onClick={() => setPendingUsers([])} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Valider</button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 1 : ACCUEIL & PROGRAMMES */}
            {activeTab === 'home' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', border: '1px solid #374151', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
                  <h2 style={{ color: '#ef4444', margin: '0 0 10px 0', fontSize: '24px' }}>Repousse tes limites avec Stay in Shape</h2>
                  <p style={{ color: '#d1d5db', fontSize: '14px', margin: '0 0 15px 0' }}>La plateforme ultime conçue par des passionnés pour transformer ton physique et optimiser tes performances.</p>
                  <span style={{ background: '#ef4444', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>🔥 Aucune excuse, que des résultats 🔥</span>
                </div>

                <h3 style={{ fontSize: '18px', color: '#f87171', margin: '0 0 -10px 0' }}>Programmes adaptés à ton profil</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '15px' }}>
                  {[
                    { title: '💪 Prise de Muscle / Masse', desc: 'Prendre du volume propre, surcharge progressive et super-collations.' },
                    { title: '🔥 Sèche & Perte de Gras', desc: 'Brûler un maximum de calories tout en blindant le muscle.' },
                    { title: '⚡ Force & Explosivité', desc: 'Développer une puissance maximale, détente et explosivité pure.' },
                    { title: '🛡️ Stabilisation & Forme', desc: 'Maintenir un physique affûté, une santé de fer et une énergie stable.' }
                  ].map((p, idx) => (
                    <div key={idx} style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '10px' }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '16px' }}>{p.title}</h4>
                      <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2 : VIDÉOS DES COACHS (SIMPLIFIÉ ET SANS VIDÉO IMPOSÉE) */}
            {activeTab === 'videos' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '25px', borderRadius: '12px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#3b82f6' }}>🎥 Ajouter une vidéo (Nolan, Zaïd, Mathys ou Théo)</h3>
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '15px' }}>Sélectionne ton nom, mets un titre et colle ton lien vidéo en un clic.</p>
                  <form onSubmit={handleUploadCoachVideo} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr auto', gap: '10px' }}>
                    <select value={selectedCoach} onChange={(e) => setSelectedCoach(e.target.value)} style={{ background: '#030712', border: '1px solid #1f2937', color: '#fff', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>
                      <option value="Nolan">Nolan</option>
                      <option value="Zaïd">Zaïd</option>
                      <option value="Mathys">Mathys</option>
                      <option value="Théo">Théo</option>
                    </select>
                    <input type="text" placeholder="Titre de la vidéo" value={vidTitle} onChange={(e) => setVidTitle(e.target.value)} required style={{ background: '#030712', border: '1px solid #1f2937', padding: '10px', color: '#fff', borderRadius: '8px' }} />
                    <input type="text" placeholder="Lien direct de la vidéo (URL MP4)" value={vidUrl} onChange={(e) => setVidUrl(e.target.value)} required style={{ background: '#030712', border: '1px solid #1f2937', padding: '10px', color: '#fff', borderRadius: '8px' }} />
                    <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Publier</button>
                  </form>
                </div>

                {/* Blocs dédiés pour chaque coach */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  {Object.entries(coachVideos).map(([coachName, vids]) => (
                    <div key={coachName} style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ margin: 0, color: '#ef4444', fontSize: '16px', borderBottom: '1px solid #1f2937', paddingBottom: '8px' }}>Espace de {coachName}</h4>
                      {vids.length === 0 ? (
                        <p style={{ color: '#6b7280', fontSize: '12px', margin: '10px 0', fontStyle: 'italic' }}>Aucune vidéo pour le moment.</p>
                      ) : (
                        vids.map(v => (
                          <div key={v.id} style={{ background: '#030712', padding: '10px', borderRadius: '8px', border: '1px solid #1f2937' }}>
                            <p style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 6px 0' }}>{v.title}</p>
                            <video controls style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '6px', background: '#000' }}>
                              <source src={v.url} type="video/mp4" />
                            </video>
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3 : NUTRITION & RECETTES ENRICHIE */}
            {activeTab === 'nutrition' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '25px', borderRadius: '12px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#10b981' }}>🥗 Pôle Nutrition & Recettes Hautes en Calories / Protéines</h3>
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '15px' }}>Partage tes meilleurs conseils diététiques, collations maison (flocons d'avoine, beurre de cacahuète) et recettes.</p>
                  
                  <form onSubmit={handleAddRecipe} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input type="text" placeholder="Nom de la recette / du conseil" value={recipeTitle} onChange={(e) => setRecipeTitle(e.target.value)} required style={{ background: '#030712', border: '1px solid #1f2937', padding: '10px', color: '#fff', borderRadius: '8px' }} />
                      <input type="text" placeholder="Lien vidéo de la recette (optionnel)" value={recipeUrl} onChange={(e) => setRecipeUrl(e.target.value)} style={{ background: '#030712', border: '1px solid #1f2937', padding: '10px', color: '#fff', borderRadius: '8px' }} />
                    </div>
                    <textarea placeholder="Description détaillée du conseil ou des ingrédients..." value={recipeDesc} onChange={(e) => setRecipeDesc(e.target.value)} rows="2" style={{ background: '#030712', border: '1px solid #1f2937', padding: '10px', color: '#fff', borderRadius: '8px', resize: 'none' }}></textarea>
                    <button type="submit" style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Ajouter au pôle nutrition</button>
                  </form>
                </div>

                {/* Affichage des recettes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                  {recipes.map(r => (
                    <div key={r.id} style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <h4 style={{ margin: 0, color: '#10b981', fontSize: '16px' }}>{r.title}</h4>
                      <p style={{ color: '#d1d5db', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>{r.desc}</p>
                      {r.url && (
                        <video controls style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', background: '#000', marginTop: '5px' }}>
                          <source src={r.url} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4 : CONSEILS SPORTS (PLUS DE VISIBILITÉ ET DÉTAILS) */}
            {activeTab === 'sports' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '12px' }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#3b82f6' }}>🏆 Optimisation par Discipline Sportive</h3>
                  <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>Des clés d'entraînement spécifiques pour dompter ton sport de prédilection.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                  {sportsAdvice.map((s, idx) => (
                    <div key={idx} style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#fff' }}>{s.name}</h4>
                      <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>{s.tips}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5 : QUIZ OBJECTIF */}
            {activeTab === 'quiz' && (
              <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>Trouve ton programme sur-mesure</h3>
                <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '25px' }}>Quel est ton objectif numéro un en ce moment ?</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {['Prise de Masse', 'Sèche / Perte de Gras', 'Force & Explosivité', 'Remise en forme globale'].map((opt, idx) => (
                    <button key={idx} onClick={() => setQuizGoal(opt)} style={{ background: quizGoal === opt ? '#ef4444' : '#030712', color: '#fff', border: '1px solid #1f2937', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                      {opt}
                    </button>
                  ))}
                </div>
                {quizGoal && (
                  <div style={{ marginTop: '25px', padding: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '10px' }}>
                    <p style={{ color: '#f87171', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>🎯 Recommandation des coachs : Objectif "{quizGoal}" validé ! Suis les programmes dédiés et donne tout à l'entraînement.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 6 : PHOTOS DE PROGRESSION */}
            {activeTab === 'photos' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '25px', borderRadius: '12px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#f59e0b' }}>📸 Suivi Visuel de ta Transformation</h3>
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '15px' }}>Ajoute le lien d'une photo pour archiver ta progression physique au fil des semaines.</p>
                  <form onSubmit={handleUploadPhoto} style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Colle le lien URL de ton image ici..." value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required style={{ flex: 1, background: '#030712', border: '1px solid #1f2937', padding: '10px', color: '#fff', borderRadius: '8px' }} />
                    <button type="submit" style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Enregistrer</button>
                  </form>
                </div>

                <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '12px' }}>
                  <h4 style={{ margin: '0 0 15px 0', color: '#f59e0b', fontSize: '16px' }}>Galerie de progression</h4>
                  {photos.length === 0 ? (
                    <p style={{ color: '#6b7280', fontSize: '13px', margin: 0, fontStyle: 'italic' }}>Aucune photo pour l'instant. Commence ton suivi dès aujourd'hui !</p>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                      {photos.map(p => (
                        <img key={p.id} src={p.url} alt="Progression" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #1f2937' }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}