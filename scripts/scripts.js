document.addEventListener("DOMContentLoaded", () => {

    /*
    =========================================================
    DOWNLOAD DO CURRÍCULO
    =========================================================
    */

    const cvButtons = document.querySelectorAll(
        '[data-action="download-cv"]'
    );

    cvButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const cvPath = "assets/curriculo-leonardo-larangeira.pdf";

            const link = document.createElement("a");

            link.href = cvPath;
            link.download = "Curriculo-Leonardo-Larangeira.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

        });

    });



    /*
    =========================================================
    COPIAR E-MAIL
    =========================================================
    */

    const copyEmailButton = document.querySelector(
        '[data-action="copy-email"]'
    );


    if (copyEmailButton) {

        copyEmailButton.addEventListener("click", async () => {

            const email =
                copyEmailButton.dataset.email;


            if (!email)
                return;


            const originalText =
                copyEmailButton.textContent;


            try {

                await navigator.clipboard.writeText(email);

                copyEmailButton.textContent =
                    "COPIADO ✓";


                copyEmailButton.classList.add(
                    "is-copied"
                );


                setTimeout(() => {

                    copyEmailButton.textContent =
                        originalText;

                    copyEmailButton.classList.remove(
                        "is-copied"
                    );

                }, 1600);

            }
            catch (error) {

                console.error(
                    "Erro ao copiar e-mail:",
                    error
                );


                /*
                Fallback para navegadores sem
                navigator.clipboard
                */

                const input =
                    document.createElement("textarea");

                input.value = email;

                input.style.position = "fixed";
                input.style.opacity = "0";

                document.body.appendChild(input);

                input.select();

                document.execCommand("copy");

                input.remove();


                copyEmailButton.textContent =
                    "COPIADO ✓";


                setTimeout(() => {

                    copyEmailButton.textContent =
                        originalText;

                }, 1600);

            }

        });

    }



    /*
    =========================================================
    SCROLL DOS LINKS INTERNOS
    =========================================================
    */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");


            if (!href || href === "#")
                return;


            const section =
                document.querySelector(href);


            if (!section)
                return;


            event.preventDefault();


            section.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });



    /*
    =========================================================
    LINK ATIVO DO MENU
    =========================================================
    */

    const sections =
        document.querySelectorAll("main section[id]");


    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;


                    const id =
                        entry.target.id;


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute("href")
                            === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },

            {

                rootMargin:
                    "-30% 0px -60% 0px",

                threshold: 0

            }

        );


    sections.forEach(section => {

        observer.observe(section);

    });

});