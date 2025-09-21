// backend/src/app.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
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

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Esta função rodará *automaticamente* uma vez quando o NestJS iniciar.
   */
  async onModuleInit() {
    this.logger.log('Iniciando verificação de seed do banco de dados...');
    await this.seedDatabase();
  }

  /**
   * Garante que os usuários de teste existam e estejam com as senhas corretas.
   */
  async seedDatabase() {
    const saltRounds = 10;

    const usersToSeed = [
      {
        email: 'novato@vivo.com.br',
        senhaPlana: 'senha123', // A senha que vamos usar para logar
        nome: 'João Silva Novato',
        perfil: UserProfileType.NOVO_COLABORADOR,
      },
      {
        email: 'buddy.legal@vivo.com.br',
        senhaPlana: 'buddy@seguro',
        nome: 'Maria Oliveira Buddy',
        perfil: UserProfileType.BUDDY,
      },
      {
        email: 'gestor.chefe@vivo.com.br',
        senhaPlana: 'gestor#forte',
        nome: 'Carlos Andrade Gestor',
        perfil: UserProfileType.GESTOR,
      },
    ];

    for (const userData of usersToSeed) {
      const { email, senhaPlana, nome, perfil } = userData;

      // 1. Gera o hash usando o MESMO bcrypt que o auth.service
      const senhaHash = await bcrypt.hash(senhaPlana, saltRounds);

      // 2. Verifica se o usuário já existe
      const user = await this.userRepository.findOne({ where: { email } });

      if (user) {
        // 3A. Se existe, ATUALIZA o hash (para garantir que é o correto) e ativa
        user.senhaHash = senhaHash;
        user.statusAtivo = 1;
        await this.userRepository.save(user);
        this.logger.log(`Usuário '${email}' ATUALIZADO com o hash correto.`);
      } else {
        // 3B. Se não existe, CRIA o usuário
        const novoUsuario = this.userRepository.create({
          email,
          senhaHash, // O hash correto
          nomeCompleto: nome,
          tipoPerfil: perfil,
          statusAtivo: 1,
          // Outros campos usarão os defaults da entidade
        });
        await this.userRepository.save(novoUsuario);
        this.logger.log(`Usuário '${email}' CRIADO com sucesso.`);
      }
    }

    this.logger.log('Seed do banco de dados concluído.');
  }
}
