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
                                        <a href="/diensten/#schilderwerk">Behangen</a>
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

<!-- Voeg dit JS toe in je <head> of onderaan body (via components.js als nodig) -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>
    emailjs.init("YOUR_USER_ID");  // Je EmailJS user ID

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Verstuur naar jou (template 1)
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID_1', {
            from_name: document.querySelector('#name').value,
            from_email: document.querySelector('#email').value,
            message: document.querySelector('#message').value
        }).then(function() {
            // Auto-reply naar klant (template 2)
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID_2', {
                to_name: document.querySelector('#name').value,
                to_email: document.querySelector('#email').value,
                message: document.querySelector('#message').value
            });
            window.location.href = 'https://www.geitzklussenbedrijf.nl/bericht-ontvangen/';
        }, function(error) {
            alert('Fout: ' + JSON.stringify(error));
        });
    });
</script>



<form action="https://formsubmit.co/info@geitzklussenbedrijf.nl" method="POST">

    <!-- Jouw mail (info@) blijft perfect met table template -->
    <input type="hidden" name="_subject" value="Nieuw bericht via geitzklussenbedrijf.nl">
    <input type="hidden" name="_template" value="table">

    <!-- AUTO-REPLY NAAR KLANT: NU VOLLEDIG NEDERLANDS + HTML + LOGO -->
    <input type="hidden" name="_autoresponse" value="Geitz Klussenbedrijf heeft je bericht ontvangen!">
    <input type="hidden" name="_autoresponse.html" value="
        <h3 style='color:#2c5aa0;'>Beste {{name}},</h3>
        <p>Bedankt voor je bericht! Hieronder een automatische kopie:</p>
        <blockquote style='background:#f9f9f9;padding:15px;border-left:4px solid #2c5aa0;margin:20px 0;'>
            {{message}}
        </blockquote>
        <hr style='border:1px solid #eee;'>
        <p>Ik reageer zo snel mogelijk – uiterlijk binnen 1-2 werkdagen.</p>
        <p>Met vriendelijke groet,<br>
        <strong>Marc Geitz</strong><br>
        Geitz Klussenbedrijf<br>
        <a href='https://www.geitzklussenbedrijf.nl' style='color:#2c5aa0;'>www.geitzklussenbedrijf.nl</a></p>
        <p>&nbsp;</p>
        <div style='text-align:center;'>
            <img src='https://www.geitzklussenbedrijf.nl/assets/logos/logo.avif' alt='Geitz Klussenbedrijf' width='300' style='max-width:100%;height:auto;border-radius:8px;'>
        </div>
        <p style='font-size:12px;color:#666;margin-top:30px;'>
            Dit is een automatisch gegenereerde e-mail van het contactformulier op geitzklussenbedrijf.nl
        </p>
    ">

    <!-- Doorverwijzing -->
    <input type="hidden" name="_next" value="https://www.geitzklussenbedrijf.nl/bericht-ontvangen/">

    <!-- Spam-protectie (captcha blijft, want anders geen auto-reply) -->
    <!-- Als je later geen captcha wil: voeg _captcha=false toe, maar dan geen HTML auto-reply -->

    <!-- Velden -->
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