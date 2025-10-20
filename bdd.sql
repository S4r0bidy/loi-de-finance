-- Création de la base de données
CREATE DATABASE macroeconomie;
USE macroeconomie;

-- Table principale
CREATE TABLE agregats_macroeconomiques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    indicateur VARCHAR(100) NOT NULL,
    unite VARCHAR(50),
    annee_2024 DECIMAL(15,2),
    annee_2025 DECIMAL(15,2),
    annee_2026 DECIMAL(15,2)
);

-- Insertion des données
INSERT INTO agregats_macroeconomiques (indicateur, unite, annee_2024, annee_2025, annee_2026) VALUES
('PIB nominal', 'milliards d’Ariary', 78945.4, 88851.6, 99826.3),
('Taux de croissance économique', '%', 4.4, 5.0, 5.2),
('Indice des prix à la consommation (fin de période)', '%', 8.2, 7.1, 7.2),
('Ratio de dépenses publiques', '% PIB', 16.2, 18.4, 17.8),
('Solde global (base caisse)', '% PIB', -4.3, -4.1, -4.1),
('Solde primaire (base caisse)', 'milliards d’Ariary', 214.2, 1097.6, 866.0),
('Taux de change Dollars/Ariary', 'Ariary', 4508.6, 4688.8, 4853.2),
('Taux de change Euro/Ariary', 'Ariary', 4905.5, 5275.2, 5532.7),
('Taux d’investissement public', '% PIB', 6.1, 9.6, 8.3),
('Taux d’investissement privé', '% PIB', 14.6, 12.0, 13.7),
('Taux de pression fiscale', '% PIB', 10.6, 11.2, 11.8);


CREATE TABLE croissance_sectorielle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    indicateur VARCHAR(100) NOT NULL,
    annee_2024 DECIMAL(15,2),
    annee_2025 DECIMAL(15,2),
)

INSERT INTO croissance_sectorielle (indicateur, unite, annee_2024, annee_2025) VALUES
('SECTEUR PRIMAIRE', 5.3, 7.8),
('Agriculture', 6.0, 9.5),
('Élevage et pêche', 3.9, 9.5),
('Sylviculture', 1.0, 1.1),

('SECTEUR SECONDAIRE', -3.3, 3.4),
('Industrie extracive', -20.8, 4.0),
('Alimentaire, boisson, tabac', 0.9, 2.4),
('Textile', 31.6, 4.0),
('Bois, papiers, imprimerie', 0.4, 0.7),
('Matériaux de construction', 7.9, 8.0),
('Industrie métallique', 7.2, 7.3),
('Machine, matériels éléctriques', 3.1, 3.2),
('Industries diverses', 0.5, 0.6),
('Éléctricité, eau, gaz', 3.9, 4.0),

('SECTEUR TERTIAIRE', 5.0, 5.4),
('BTP', 3.2, 3.6),
('Commerce, entretiens, réparations', 4.2, 4.3),
('Hôtel, restaurant', 14.7, 14.9),
('Transport', 7.0, 7.2),
('Poste et télécommunication', 13.4, 13.7),
('Banque, assurance', 5.3, 6.1),
('Services aux entreprises', 2.3, 2.4),
('Admnistration', 1.7, 1.9),
('Éducation', 1.7, 1.8),
('Santé', 1.8, 1.9),
('Services rendus aux ménages', 1.3, 1.4),

