import { Router } from "express";


const router = Router();

router.use((req, res, next) => {
    if (!req.session.user) {
        res.render("login", {
            message: {
                type: "error",
                title: "Acceso denegado",
                text: "Inicia sesión para ver los productos",
            },
        });
    } else {
        next()
    }
});

router.get("/", (req, res) => {
    res.render("chat", {})
})

export default router;