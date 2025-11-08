import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserProfileType } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  getHello(): string {
    return 'Vivo Essential Backend - Time Flow Makers 🚀';
  }

  /**
   * PILAR 5 TQM: Automação > Ação Manual
   * Database Seeder automático para garantir dados de teste
   * em qualquer dispositivo que rodar o projeto
   */
  private async seedDatabase(): Promise<void> {
    try {
      const userCount = await this.userRepository.count();

      if (userCount > 0) {
        this.logger.log('Database já possui dados. Seeder ignorado.');
        return;
      }

      this.logger.log('Iniciando Database Seeder...');

      // Dados de teste para os avaliadores da VIVO
      const testUsers = [
        {
          email: 'novo.colaborador@vivo.com.br',
          nomeCompleto: 'João Silva',
          tipoPerfil: UserProfileType.NOVO_COLABORADOR,
          senha: '123456',
        },
        {
          email: 'buddy@vivo.com.br',
          nomeCompleto: 'Maria Santos',
          tipoPerfil: UserProfileType.BUDDY,
          senha: '123456',
        },
        {
          email: 'gestor@vivo.com.br',
          nomeCompleto: 'Carlos Pereira',
          tipoPerfil: UserProfileType.GESTOR,
          senha: '123456',
        },
      ];

      for (const userData of testUsers) {
        const hashedPassword = await bcrypt.hash(userData.senha, 10);

        const user = this.userRepository.create({
          email: userData.email,
          nomeCompleto: userData.nomeCompleto,
          tipoPerfil: userData.tipoPerfil,
          senhaHash: hashedPassword,
          statusAtivo: 1,
        });

        await this.userRepository.save(user);
        this.logger.log(`✅ Usuário criado: ${userData.email}`);
      }

      this.logger.log('🎉 Database Seeder concluído com sucesso!');
    } catch (error) {
      this.logger.error('❌ Erro no Database Seeder:', error);
    }
  }
}
