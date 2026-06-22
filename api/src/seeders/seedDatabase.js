import bcrypt from "bcrypt";
import Pessoa from "../models/PessoaModel.js";
import Automovel from "../models/AutomovelModel.js";
import TestDrive from "../models/TestDriveModel.js";
import AutomovelFoto from "../models/AutomovelFotoModel.js";

export const seedDatabase = async () => {
  try {
    await Pessoa.sync({ force: true });
    await Automovel.sync({ force: true });
    await TestDrive.sync({ force: true });
    await AutomovelFoto.sync({ force: true });

    const adminPasswordHash = await bcrypt.hash("admin123", 10);
    const userPasswordHash = await bcrypt.hash("user123", 10);

    await Pessoa.create({
      nome: "Admin Moretto",
      email: "admin@moretto.com",
      telefone: "11999999999",
      tipoPessoa: 0,
      cpfCnpj: "12345678901234",
      passwordHash: adminPasswordHash,
    });

    await Pessoa.create({
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "11988888888",
      tipoPessoa: 1,
      cpfCnpj: "98765432101234",
      passwordHash: userPasswordHash,
    });

    await Pessoa.create({
      nome: "Maria Santos",
      email: "maria@email.com",
      telefone: "11987654321",
      tipoPessoa: 1,
      cpfCnpj: "55555555555555",
      passwordHash: userPasswordHash,
    });

    await Pessoa.create({
      nome: "Pedro Costa",
      email: "pedro@email.com",
      telefone: "11986543210",
      tipoPessoa: 1,
      cpfCnpj: "66666666666666",
      passwordHash: userPasswordHash,
    });

    await Automovel.create({
      placa: "ABC1234",
      marca: "Ferrari",
      modelo: "F8 Tributo",
      ano: 2023,
      cor: "Vermelho",
    });

    await Automovel.create({
      placa: "DEF5678",
      marca: "Lamborghini",
      modelo: "Huracán",
      ano: 2022,
      cor: "Amarelo",
    });

    await Automovel.create({
      placa: "GHI9012",
      marca: "Porsche",
      modelo: "911 Turbo",
      ano: 2024,
      cor: "Preto",
    });

    await Automovel.create({
      placa: "JKL3456",
      marca: "BMW",
      modelo: "M5",
      ano: 2023,
      cor: "Branco",
    });

    await Automovel.create({
      placa: "MNO7890",
      marca: "Mercedes-Benz",
      modelo: "AMG GT",
      ano: 2022,
      cor: "Cinza",
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}
