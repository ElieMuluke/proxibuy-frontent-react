import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
// const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const creationBoutiqueFormSchema = z.object({
	boutiqueImage: z
		.custom<FileList>()
		.transform((fileList) =>
			fileList && fileList.length > 0 ? fileList.item(0) : null
		)
		.refine(
			(file) => !file || file.size <= MAX_UPLOAD_SIZE,
			"Image trop grande. Taille maximum 3MB"
		)
		.refine(
			(file) => !file || file.type?.startsWith("image"),
			"Le type de l'image n'est pas valide(png, jpeg, jpg)"
		),
	boutiqueName: z.string().min(3, { message: "Entrez le nom de la boutique." }),
	boutiqueDescription: z
		.string()
		.min(3, { message: "Entrez la description de la boutique." }),
	storeProductCategory: z
		.array(
			z.object({
				value: z.string(),
				name: z.string(),
			})
		)
		.nonempty({
			message: "Sélectionnez les catégories de produits de votre boutique.",
		}),
	// storeActivitySector: z.string({
	// 	required_error: "Sectionnez les secteurs d'activités de votre boutique",
	// }),
	country: z.object(
		{
			id: z.string(),
			name: z.string(),
		},
		{
			message: "Entrer pays", // Custom error message
		}
	),
	province: z.object(
		{
			id: z.string(),
			name: z.string(),
		},
		{
			message: "Entrer province", // Custom error message
		}
	),
	// region: z.string({
	// 	required_error: "Entrez la commune de la boutique.",
	// }),
	// neighborhood: z.string({
	// 	required_error: "Entrez le quartier de la boutique.",
	// }),
	adress: z.string().min(3, { message: "Entrez l'adresse de la boutique." }),
	sponsorshipCode: z.string().optional(),
	latitude: z.number({
		required_error: "Entrez la latitude de la boutique.",
	}),
	longitude: z.number({
		required_error: "Entrez la longitude de la boutique.",
	}),
	// fullnames: z.string({
	// 	required_error: "Entrez votre nom complet.",
	// }),
	// IdNumber: z.string({
	// 	required_error: "Entrez votre numéro d'identification.",
	// }),
	// birthDate: z.string({
	// 	required_error: "Entrez votre date de naissance.",
	// }),
	// nationality: z.string({
	// 	required_error: "Entrez votre nationalité.",
	// }),
	// identityDocument: z.object({}),
	// productName: z.string({
	// 	required_error: "Entrez le nom du produit.",
	// }),
	// operationType: z.string({
	// 	required_error: "Entrez le type d'opération.",
	// }),
	// price: z.string({
	// 	required_error: "Entrez le prix du produit.",
	// }),
	// pricingType: z.string({
	// 	required_error: "Entrez le type de tarification.",
	// }),
	agreeToTerms: z.boolean({
		required_error: "Vous devez accepter les termes.",
	}),
});

export const updateBoutiqueFormSchema = z.object({
	// boutiqueImage: z
	// 	.custom<FileList>()
	// 	.transform((fileList) => (fileList.length > 0 ? fileList.item(0) : null))
	// 	.refine(
	// 		(file) => !file || file.size <= MAX_UPLOAD_SIZE,
	// 		"Image trop grande. Taille maximum 3MB"
	// 	)
	// 	.refine(
	// 		(file) => !file || file.type?.startsWith("image"),
	// 		"Le type de l'image n'est pas valide(png, jpeg, jpg)"
	// 	),
	boutiqueName: z.string({
		required_error: "Entrez le nom de la boutique.",
	}),
	boutiqueDescription: z.string({
		required_error: "Entrez la description de la boutique.",
	}),
	boutiqueAddress: z.string({
		required_error: "Entrez l'adresse de la boutique.",
	}),
});

export const addProductFormSchema = z.object({
	productName: z.string().nonempty("Le nom du produit est obligatoire"),
	productDescription: z.string().nonempty("La description est obligatoire"),
	// productPrice: z.number().min(0, "Le prix doit être supérieur à 0"),
	productStock: z.preprocess(
		(val) => Number(val),
		z.number().min(0, "La quantité en stock doit être supérieure à 0")
	), // Parse string to number
	forSale: z.boolean(), // Whether the product is for sale
	rentalType: z.string().optional(),
	lastPrice: z.preprocess(
		(val) => Number(val),
		z.number().min(0, "Le dernier prix doit être supérieur à 0")
	), // Parse string to number
	productMainImage: z
		.instanceof(File)
		.nullable() // Allow null initially
		.refine(
			(file) => !file || file.size <= 5000000,
			"La taille de l'image ne doit pas dépasser 5MB"
		), // 5MB size limit, and allow null
	images: z
		.array(z.instanceof(File))
		.refine(
			(files) => files.length <= 5,
			"Vous ne pouvez pas télécharger plus de 5 images"
		)
		.refine(
			(files) => files.every((file) => file.size <= 5000000),
			"Chaque image ne doit pas dépasser 5MB"
		), // Validation for multiple images
	isAvailable: z.boolean(), // Availability status
	currency: z.string().nonempty("La devise est obligatoire"),
	categoryProductId: z
		.string()
		.nonempty("La catégorie de produit est obligatoire"), // Category selection (combobox)
});
