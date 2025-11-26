// Esperamos a que todo el documento HTML esté cargado
document.addEventListener('DOMContentLoaded', (event) => {
    
    // --- Referencias a elementos existentes ---
    const video = document.getElementById('background-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const mainContainer = document.querySelector('.main-container');
    const backBtn = document.getElementById('back-btn');
    const infoPanel = document.getElementById('info-panel');
    const closeInfoBtn = document.getElementById('close-info-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const workModal = document.getElementById('work-modal');
    const modalBody = document.getElementById('modal-body');
    const modalSpinner = document.getElementById('modal-spinner'); // Referencia al spinner
    // Referencias a botones de navegación
    const modalPrevBtn = document.getElementById('modal-prev-btn');
    const modalNextBtn = document.getElementById('modal-next-btn');


    // --- Referencias a los elementos de navegación de la tarjeta principal ---
    const contactLink = document.getElementById('contact-link');
    const aboutLink = document.getElementById('about-link');
    
    // --- Referencias a los elementos del panel lateral ---
    const navUsBtn = document.getElementById('nav-us');
    const navWorkBtn = document.getElementById('nav-work');
    const contentUs = document.getElementById('info-content-us');
    const contentWork = document.getElementById('info-content-work');
    const animationContainer = document.querySelector('.animation-container-25'); // Nueva referencia al contenedor de animación
    
    // --- Referencias a NUEVOS elementos de Audio y Botones (Música) ---
    const musicAudio = document.getElementById('background-music');
    const mainMusicBtn = document.getElementById('main-music-btn');
    const panelMusicBtn = document.getElementById('panel-music-btn');

    // REFERENCIAS Y LÓGICA NUEVA PARA MEDIR LA LÍNEA
    const workTextSpan = document.getElementById('work-text-span');
    const separatorLine = document.getElementById('panel-separator-line');

    function adjustSeparatorWidth() {
        if (workTextSpan && separatorLine) {
            // Medimos el ancho exacto del span que contiene "WORK"
            const workWidth = workTextSpan.offsetWidth;
            // Aplicamos ese ancho a la línea en píxeles exactos
            separatorLine.style.width = workWidth + 'px';
        }
    }

    // Ejecutar al cargar la página inicialmente
    adjustSeparatorWidth();

    // Ejecutar cada vez que la ventana cambia de tamaño
    window.addEventListener('resize', adjustSeparatorWidth);
    // FIN LÓGICA NUEVA PARA MEDIR LA LÍNEA

    // Variable global para almacenar el índice del proyecto actual
    let currentProjectIndex = 0; 

    // Contenido para la sección US
    const contentUsHTML = `
        <span class="content-us-title content-us-fine-title">NO HAY TRABAJO<br>PEQUEÑO<br>HAY TRABAJO<br>BIEN HECHO<br>O MAL HECHO</span>
        <div class="animation-container-25" id="animation-container-25">
            <span class="anim-number" id="animated-number">0</span>
            <!-- TEXTO ACTUALIZADO PARA QUE QUEDE EN DOS LÍNEAS -->
            <span class="anim-text" id="animated-text">AÑOS DE EXPERIENCIA<br>EN RETAIL Y DISTRIBUCIÓN</span>
        </div>
        <span class="content-us-text">A lo largo de todo este tiempo hemos realizado proyectos de distintas envergaduras para nuestros clientes desde folletos (nacionales y territoriales), segmentaciones packaging, jingles, cuñas de radio, prensa, publicidad exterior, P.O.S., Centros Comerciales, cartelerías, hasta campañas de planes de comercio para televisión.</span>
        <span class="content-us-title content-us-fine-title">HACER GRANDES<br>CAMPAÑAS<br>ESTÁ MUY BIEN...<br>PERO CONSTRUIR<br>MARCA<br>TODOS LOS DÍAS,<br>ES VITAL.</span>
        <span class="content-us-text">RAF toma su nombre de la aproximación fonética en español de rough. Y rough —boceto, borrador, apunte— es el momento donde las ideas toman forma por primera vez. Pensar antes de hacer, marca la diferencia. Un rough es más que un dibujo rápido; es el momento donde las ideas toman forma por primera vez. Pensar antes de hacer, marca la diferencia. Un rough es más que un dibujo rápido; es la materialización de un plan. Nos obliga a considerar la composición, el mensaje y el objetivo final. El tiempo invertido en pensar se traduce directamente en mejores resultados cuando se realiza el trabajo. Además son una herramienta más de comunicación con el cliente. ¿A que suena bien?</span>
    `;

    // Array de proyectos (con tu roscón y los placeholders)
    const projects = [
        { id: 1, thumb: 'assets/work-thumb-roscon.jpg', full: 'assets/work-full-roscon.jpg' }, 
        { id: 2, thumb: 'assets/work-thumb-2.jpg', full: 'assets/work-full-2.jpg' },
        { id: 3, thumb: 'assets/work-thumb-3.jpg', full: 'assets/work-full-3.jpg' },
        { id: 4, thumb: 'assets/work-thumb-4.jpg', full: 'assets/work-full-4.jpg' },
        { id: 5, thumb: 'assets/work-thumb-5.jpg', full: 'assets/work-full-5.jpg' },
        { id: 6, thumb: 'assets/work-thumb-6.jpg', full: 'assets/work-full-6.jpg' },
        { id: 7, thumb: 'assets/work-thumb-7.jpg', full: 'assets/work-full-7.jpg' },
        { id: 8, thumb: 'assets/work-thumb-8.jpg', full: 'assets/work-full-8.jpg' },
        { id: 9, thumb: 'assets/work-thumb-9.jpg', full: 'assets/work-full-9.jpg' },
        { id: 10, thumb: 'assets/work-thumb-10.jpg', full: 'assets/work-full-10.jpg' },
        { id: 11, thumb: 'assets/work-thumb-11.jpg', full: 'assets/work-full-11.jpg' },
        { id: 12, thumb: 'assets/work-thumb-12.jpg', full: 'assets/work-full-12.jpg' }
    ];
    
    // Generación del HTML de la rejilla
    let contentWorkHTML = '<div class="work-grid">';
    projects.forEach((project, index) => {
        contentWorkHTML += `
            <button class="work-item-btn" data-project-id="${project.id}" data-project-index="${index}" aria-label="Ver detalles del proyecto ${project.id}">
                <img src="${project.thumb}" alt="Miniatura del proyecto ${project.id}" class="work-item-thumbnail">
            </button>
        `;
    });
    contentWorkHTML += '</div>';
    
    if (contentUs) contentUs.innerHTML = contentUsHTML;
    if (contentWork) contentWork.innerHTML = contentWorkHTML;
    
    // Lógica de la animación del contador 
    let hasAnimated = false; // Bandera para asegurar que la animación solo corra una vez

    function runCounterAnimation() { 
        if (hasAnimated) return; // Salir si ya animó

        const numberElement = document.getElementById('animated-number');
        const textElement = document.getElementById('animated-text');
        const finalNumber = 25;
        let currentNumber = 0;
        const duration = 1500;
        const stepTime = Math.ceil(duration / finalNumber);
        
        if (numberElement) { numberElement.textContent = '0'; numberElement.classList.remove('is-final-color'); }
        if (textElement) { textElement.classList.remove('is-visible'); }
        
        const counterInterval = setInterval(() => {
            currentNumber++;
            if (numberElement) { numberElement.textContent = currentNumber; }
            if (currentNumber === finalNumber) {
                clearInterval(counterInterval);
                if (numberElement) { numberElement.classList.add('is-final-color'); }
                if (textElement) { textElement.classList.add('is-visible'); }
                hasAnimated = true; // Marcamos como animado
            }
        }, stepTime);
    }

    // -----------------------------------------------------
    // NUEVA LOGICA: Animacion al hacer scroll (Intersection Observer)
    // -----------------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento es visible y no se ha animado antes, ejecutamos la animación.
            if (entry.isIntersecting && !hasAnimated) {
                runCounterAnimation();
            }
        });
    }, {
        root: null, // Observa con respecto al viewport (ventana del navegador)
        rootMargin: '0px',
        threshold: 0.5 // Se dispara cuando el 50% del elemento es visible
    });

    // Observamos el contenedor de la animación si existe
    const animContainer = document.getElementById('animation-container-25');
    if (animContainer) {
        observer.observe(animContainer);
    }

    // Funcionalidad del Video (sin cambios)
    if (playPauseBtn && video) {
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = 'Ⅱ';
                playPauseBtn.setAttribute('aria-label', 'Pausar vídeo de fondo');
            } else {
                video.pause();
                playPauseBtn.textContent = '▶';
                playPauseBtn.setAttribute('aria-label', 'Reproducir vídeo de fondo');
            }
        });
    }

    // --- Lógica de la Música (NUEVA) ---
    
    // Función para manejar el estado mute/unmute de la música
    function toggleMusicMute(isMuted) {
        if (isMuted) {
            musicAudio.pause();
            // Añadimos la clase 'is-muted' a ambos botones para que CSS los tache
            mainMusicBtn.classList.add('is-muted');
            panelMusicBtn.classList.add('is-muted');
            mainMusicBtn.setAttribute('aria-label', 'Reproducir música de fondo');
            panelMusicBtn.setAttribute('aria-label', 'Reproducir música de fondo');
            // Guardamos preferencia en localStorage para recordar la elección
            localStorage.setItem('rafMusicMuted', 'true');
        } else {
            // Intentamos reproducir. En muchos navegadores modernos, esto solo funcionará tras una interacción del usuario.
            musicAudio.play().catch(e => console.log("La reproducción automática de audio fue bloqueada.", e));
            mainMusicBtn.classList.remove('is-muted');
            panelMusicBtn.classList.remove('is-muted');
            mainMusicBtn.setAttribute('aria-label', 'Pausar música de fondo');
            panelMusicBtn.setAttribute('aria-label', 'Pausar música de fondo');
            localStorage.setItem('rafMusicMuted', 'false');
        }
    }

    // Lógica para alternar el mute cuando se pulsa cualquiera de los botones
    function handleMusicButtonClick() {
        // Usamos musicAudio.paused para determinar el estado actual
        toggleMusicMute(!musicAudio.paused);
    }
    
    // Asignamos listeners a los nuevos botones
    if (mainMusicBtn && panelMusicBtn) {
        mainMusicBtn.addEventListener('click', handleMusicButtonClick);
        panelMusicBtn.addEventListener('click', handleMusicButtonClick);
    }

    // Cargamos el estado preferido del usuario al cargar la página
    const savedMutedState = localStorage.getItem('rafMusicMuted');
    if (savedMutedState === 'true') {
        toggleMusicMute(true);
    } else {
        // Inicialmente intentamos que esté sonando si no hay preferencia guardada de mute
        toggleMusicMute(false);
    }

    // Funcionalidad de Giro de Tarjeta (sin cambios)
    if (mainContainer && contactLink && backBtn) {
        contactLink.addEventListener('click', () => { mainContainer.classList.add('flipped'); });
        backBtn.addEventListener('click', () => { mainContainer.classList.remove('flipped'); });
    }

    // Funcionalidad del Panel de Información Lateral (ACTUALIZADO para ocultar botón de música principal)
    if (aboutLink && infoPanel && closeInfoBtn && mainContainer && video && playPauseBtn && mainMusicBtn) {
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault(); infoPanel.classList.add('is-active'); mainContainer.style.opacity = '0';
            video.pause(); playPauseBtn.textContent = '▶'; playPauseBtn.style.display = 'none';
            // Ocultamos también el botón de música principal cuando abrimos el panel
            mainMusicBtn.style.display = 'none';

            contentUs.style.display = 'none'; contentWork.style.display = 'none';
            navUsBtn.classList.remove('active'); navWorkBtn.classList.remove('active');

            // -----------------------------------------------------
            // NUEVA LOGICA: Observar la animación cuando se abre el panel
            // -----------------------------------------------------
            if (animContainer) {
                 // Si el panel de US está activo (por defecto no), empezamos a observar
                 observer.observe(animContainer); 
            }
        });
        closeInfoBtn.addEventListener('click', () => {
            infoPanel.classList.remove('is-active'); mainContainer.style.opacity = '1';
            video.play(); playPauseBtn.style.display = 'block'; 
            mainMusicBtn.style.display = 'block'; // Mostramos el botón principal de nuevo
            playPauseBtn.textContent = 'Ⅱ';
            
            // -----------------------------------------------------
            // NUEVA LOGICA: Dejar de observar cuando se cierra el panel
            // -----------------------------------------------------
            if (animContainer) {
                observer.unobserve(animContainer);
            }
        });
    }

    // Lógica de Pestañas US/WORK (ACTUALIZADO para manejar observer)
    function switchPanelContent(contentType) {
        if (contentType === 'us') {
            contentUs.style.display = 'block'; contentWork.style.display = 'none';
            navUsBtn.classList.add('active'); navWorkBtn.classList.remove('active');
            
            // --- LÓGICA DE REINICIO DE ANIMACIÓN AÑADIDA AQUÍ ---
            hasAnimated = false; // Reinicia la bandera para permitir la animación de nuevo
            if (animContainer) {
                observer.unobserve(animContainer); // Dejamos de observar brevemente
                observer.observe(animContainer); // Volvemos a observar para que se dispare
            }
            // ---------------------------------------------------
            
        } else if (contentType === 'work') {
            contentUs.style.display = 'none'; contentWork.style.display = 'block';
            navUsBtn.classList.remove('active'); navWorkBtn.classList.add('active');
             if (animContainer) observer.unobserve(animContainer); // Dejamos de observar al cambiar a WORK
        }
    }

    navUsBtn.addEventListener('click', () => switchPanelContent('us'));
    navWorkBtn.addEventListener('click', () => switchPanelContent('work'));


    // --- Lógica del Pop-up Modal de Proyectos (WORK) (ACTUALIZADA CON SPINNER) ---

    function updateModalImage() {
        const currentProject = projects[currentProjectIndex];
        
        // 1. Mostrar spinner y ocultar contenido anterior
        modalBody.innerHTML = '';
        modalSpinner.style.display = 'block';

        // 2. Crear nueva imagen
        const imgElement = document.createElement('img');
        imgElement.src = currentProject.full;
        imgElement.alt = "Vista completa del proyecto " + currentProject.id;
        imgElement.classList.add('work-full-image');
        imgElement.style.opacity = '0'; // Oculta la imagen inicialmente para la transición

        // 3. Cuando la imagen carga, ocultar spinner y mostrar imagen suavemente
        imgElement.onload = () => {
            modalSpinner.style.display = 'none';
            modalBody.appendChild(imgElement);
            // Pequeño retraso para asegurar que el DOM se actualizó antes de la transición
            setTimeout(() => {
                imgElement.style.opacity = '1'; 
            }, 10);
        };

        // 4. Manejar visibilidad de botones si estamos en el primer o último elemento
        modalPrevBtn.style.display = (currentProjectIndex === 0) ? 'none' : 'flex';
        modalNextBtn.style.display = (currentProjectIndex === projects.length - 1) ? 'none' : 'flex';
    }

    function openWorkModal(index) {
        currentProjectIndex = index;
        updateModalImage();
        workModal.classList.add('is-active');
    }

    function navigateNext() {
        if (currentProjectIndex < projects.length - 1) {
            currentProjectIndex++;
            updateModalImage();
        }
    }

    function navigatePrev() {
        if (currentProjectIndex > 0) {
            currentProjectIndex--;
            updateModalImage();
        }
    }

    if (modalNextBtn && modalPrevBtn) {
        modalNextBtn.addEventListener('click', navigateNext);
        modalPrevBtn.addEventListener('click', navigatePrev);
    }

    contentWork.addEventListener('click', (e) => {
        const button = e.target.closest('.work-item-btn');
        if (button && button.hasAttribute('data-project-index')) {
            const index = parseInt(button.getAttribute('data-project-index'), 10);
            openWorkModal(index);
        }
    });

    closeModalBtn.addEventListener('click', () => {
        workModal.classList.remove('is-active');
        modalBody.innerHTML = ''; // Limpiamos el contenido al cerrar
        modalSpinner.style.display = 'none'; // Aseguramos que el spinner se oculte si aún estaba visible
    });

}); // Fin del evento DOMContentLoaded

