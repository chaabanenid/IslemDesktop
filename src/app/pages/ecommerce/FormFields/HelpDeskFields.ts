import { Validators } from '@angular/forms';

export interface FieldConfig {
  label: string;
  placeholder;
  control: any[];
  type?: string; // input, textarea, select etc.
  options?:any;
}
const priority=["Critical","High","Moderate","Low"];
const category=[ "Hardware", "Software", "Network", "Other"];
const absenceType = [
    "Congé payé",
    "Congé de maladie",
    "Congé non payé",
    "Congé maternité",
    "Congé paternité",
    "Congé parental",
    "Congé de mariage",
    "Congé de décès",
    "Congé sabbatique",
    "Congé pour convenance personnelle",
    "Congé pour enfant malade",
    "Absence injustifiée",
    "Accident de travail",
    "Congé d'adoption",
    "Congé pour formation",
    "Congé de solidarité familiale",
    "Congé pour événements familiaux",
    "Congé pour déménagement"
  ];

export interface FormDefinition {
  serviceName: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  fields: { [key: string]: FieldConfig };
}

export const FORM_CONFIGS: { [key: string]: FormDefinition } = {
    incident: {
        serviceName: 'Déclaration d’incident',
        shortDescription: 'Signalez un incident technique ou de sécurité',
        fullDescription: 'Utilisez ce formulaire pour signaler des pannes système, des violations de données ou tout événement lié à la sécurité dans votre organisation.',
        imageUrl: 'assets/images/incident.jpg',
        fields: {
          name: { label: 'Titre de l’incident',placeholder:"Titre de l’incident", control: ["", [Validators.required]],type:"text" },
          location: { label: 'Emplacement',placeholder:"Emplacement", control: ["", [Validators.required]],type:"text" },
          description: { label: 'Description détaillée',placeholder:"", control: ["", [Validators.required]], type: 'textarea' },
          category: { label: 'category',placeholder:"", control: ["", [Validators.required]], type: 'select',options:category },
          priority: { label: 'Niveau de gravité',placeholder:"", control: ["", [Validators.required]], type: 'select',options:priority },
          
        }
      },
      
      humanresources: {
        serviceName: 'Demande de congé',
        shortDescription: 'Signalez un problème lié aux ressources humaines',
        fullDescription: 'Utilisez ce formulaire pour signaler des problèmes internes liés au comportement des employés, aux demandes RH ou aux conflits interpersonnels.',
        imageUrl: 'assets/images/hr.jpeg',
        fields: {
          employeeName: { label: 'Nom de l’employé',placeholder:"Nom de l’employé", control: ["", [Validators.required]],type:"text" },
          department: { label: 'Département', placeholder:"Département", control: ["", [Validators.required]],type:"text"  },
          abssenceType: { label: 'abssenceType',placeholder:"", control: ["", [Validators.required]],type:"select",options:absenceType  },
          startDate: { label: 'startDate',placeholder:"", control: ["", [Validators.required]],type:"date"  },
          endDate: { label: 'endDate',placeholder:"", control: ["", [Validators.required]],type:"date"  },
          absenceDays: { label: 'absenceDays',placeholder:"", control: ["", [Validators.required]],type:"number"  },
          comments: { label: 'Commentaires supplémentaires',placeholder:"", control: [""], type: 'textarea' },
        }
      },
      
      ficheDePaie: {
        serviceName: 'Fiche de paie',
        shortDescription: 'Demandez votre fiche de paie',
        fullDescription: 'Utilisez ce formulaire pour demander une copie de votre fiche de paie ou signaler une erreur liée à votre paie.',
        imageUrl: 'assets/images/finance.jpeg',
        fields: {
          employeeName: { label: 'Nom de l’employé',placeholder:"Nom de l’employé", control: ["", [Validators.required]],type:"text" },
          employeeId: { label: 'Matricule',placeholder:"Matricule", control: ["", [Validators.required]],type:"text"  },
          month: { label: 'Mois concerné',placeholder:"Mois concerné", control: ["", [Validators.required]],type:"text"  },
          reason: { label: 'Motif de la demande',placeholder:"", control: [""], type: 'textarea' }
        }
      }
      
  
};
