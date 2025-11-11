class THeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<header>
            <div class="container">
                <nav>
                    <div class="nav__logo">
                        <a href="/" class="wordmark">Geitz Klussenbedrijf</a>
                    </div>
                    <button class="hamburger" aria-label="Toggle menu">
                        <span class="hamburger__line"></span>
                        <span class="hamburger__line"></span>
                        <span class="hamburger__line"></span>
                    </button>
                    <div class="nav__links">
                        <ul>
                            <li>
                                <a href="/diensten/" aria-haspopup="true" aria-expanded="false">Diensten</a>
                                <ul class="submenu">
                                    <li>
                                        <a href="/diensten/#renovatie">Renovatie</a>
                                    </li>
                                    <li>
                                        <a href="/diensten/#timmerwerk">Timmerwerk</a>
                                    </li>
                                    <li>
                                        <a href="/diensten/#stucwerk">Stucwerk</a>
                                    </li>
                                    <li>
                                        <a href="/diensten/#schilderwerk">Schilderwerk</a>
                                    </li>
                                    <li>
                                        <a href="/diensten/#installatie">Installatie</a>
                                    </li>
                                    <li>
                                        <a href="/diensten/#kitwerk">Kitwerk</a>
                                    </li>
                                    <li>
                                        <a href="/diensten/#coating">Coating</a>
                                    </li>
                                    <li>
                                        <a href="/diensten/#vloeren">Vloeren</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/over-mij/" aria-haspopup="true" aria-expanded="false">Over mij</a>
                                <ul class="submenu">
                                    <li>
                                        <a href="/over-mij/#wie-ben-ik">Wie ben ik</a>
                                    </li>
                                    <li>
                                        <a href="/over-mij/#certificaten">Certificaten</a>
                                    </li>
                                    <li>
                                        <a href="/over-mij/#partners">Partners</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a class="button" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
		`;

	}
}

class THero extends HTMLElement {
	connectedCallback() {
		const title = this.getAttribute("title");
		const text = this.getAttribute("text");
		const showDiensten = this.hasAttribute("diensten");
		this.innerHTML = `
		<section id="hero">
			<div class="container flex">
				<div class="flex-column"></div>
				<div class="flex-column">
					<h1>${title}</h1>
					<p>${text}</p>
					<div class="flex-row buttons">
						<a class="button" href="#contact">Contact</a>
						${showDiensten ? '<a class="button outline secondary" href="/diensten/">diensten</a>' : ''}
					</div>
				</div>
			</div>
		</section>
		`;

	}
}

class TCard extends HTMLElement {
	connectedCallback() {
		const href = this.getAttribute("href");
		const src = this.getAttribute("src");
		const alt = this.getAttribute("alt");
		const title = this.getAttribute("title");
		const text = this.getAttribute("text");

		this.classList.add("jobs-list__job");

		this.innerHTML = `
		<a href="${href}">
			<img src="${src}" alt="${alt}">
			<div class="jobs-list__content">
				<h3>${title}</h3>
				<p>${text}</p>
			</div>
			<h4>meer info -></h4>
		</a>      
		`;
	}
}

class TContact extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `

        
<section id="contact">
    <div class="container flex">
        <div class="flex-column wide">
            <div class="title-wrapper">
                <h2>Contact</h2>
            </div>
            <p>Heeft u vragen of wilt u een offerte aanvragen? Neem dan contact met me op via dit formulier.</p>
        </div>
        <div class="flex-column">
            <div class="contact-form">
                <!-- Het formulier -->
                <form id="contact-form">
                    <div class="form-group">
                        <label for="name">Naam</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Bericht</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button class="button" type="submit">Verstuur</button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- EmailJS SDK laden (plak dit onderaan <body>, voor </body>) -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script type="text/javascript">
    (function() {
        // Init met je Public Key (user ID)
        emailjs.init("dUpNs3FN0iBZB3oT1");  // Vervang door je Public Key
    })();

    // Form submit handler
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();  // Voorkom page reload

        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Stap 1: Verstuur naar jou (info@)
        emailjs.send('service_n7kue88', 'template_m23gqnv', formData)
            .then(function(response) {
                console.log('Mail naar Marc verzonden!', response.status, response.text);
                
                // Stap 2: Auto-reply naar klant
                const replyData = {
                    to_name: formData.from_name,
                    to_email: formData.from_email,
                    message: formData.message
                };
                
                return emailjs.send('service_n7kue88', 'template_wd2xg4q', replyData);
            })
            .then(function(response) {
                console.log('Auto-reply verzonden!', response.status, response.text);
                // Doorverwijzing naar bedankpagina
                window.location.href = 'https://www.geitzklussenbedrijf.nl/bericht-ontvangen/';
            })
            .catch(function(error) {
                console.error('Fout bij verzenden:', error);
                alert('Er is een fout opgetreden. Probeer het later opnieuw of bel direct: 06-XXXXXXX.');
            });
    });
</script>

		`;
	}
}

class TFooter extends HTMLElement {
	connectedCallback() {
		const currentYear = new Date().getFullYear(); // Get current year

		this.innerHTML = `
        <footer>
            <div class="container footer-container">
                <div class="flex-column">
                    <div class="footer-logo">
                        <img src="/assets/logos/logo.avif" alt="Geitz Klussenbedrijf">
                    </div>
                </div>
                <div class="flex-column">
                    <div class="footer-contact">
                        <p>
                            <span style="font-weight:700">Geitz Klussenbedrijf</span>
                            <br>
                            Wrijfschaalpad 21c
                            <br>
                            5347 HX Oss
                            <br>
                            06 - 21 813 113
                            <br>
                            KvK Oost Brabant: 81824092
                            <br>
                            <a href="mailto:info@geitzklussenbedrijf.nl">info@geitzklussenbedrijf.nl</a>
                            <br>
                            <a href="/algemene-voorwaarden">Algemene voorwaarden</a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <p>
                    &copy; 2021 - ${currentYear} Geitz klussenbedrijf
                </p>
            </div>
        </footer>
		`;
	}
}

class TLightbox extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `	
		<div id="lightbox" class="lightbox">
			<span class="lightbox-close">&times;</span>
			<img class="lightbox-content" id="lightbox-img">
			<div id="lightbox-caption" class="lightbox-caption"></div>
		</div>
	`;
	}
}


customElements.define("geitz-header", THeader);
customElements.define("geitz-hero", THero);
customElements.define("geitz-card", TCard);
customElements.define("geitz-contact", TContact);
customElements.define("geitz-footer", TFooter);
customElements.define("geitz-lightbox", TLightbox);