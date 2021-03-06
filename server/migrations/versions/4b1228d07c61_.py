"""empty message

Revision ID: 4b1228d07c61
Revises: 93455be47e90
Create Date: 2017-01-29 09:56:38.630926

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4b1228d07c61'
down_revision = '93455be47e90'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('device', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('group', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('path', 'share_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('share', 'device_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('share', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('user_group_association', 'group_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('user_group_association', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_constraint('user_group_association_group_id_fkey', 'user_group_association', type_='foreignkey')
    op.create_foreign_key(None, 'user_group_association', 'group', ['group_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user_group_association', type_='foreignkey')
    op.create_foreign_key('user_group_association_group_id_fkey', 'user_group_association', 'group', ['group_id'], ['id'])
    op.alter_column('user_group_association', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('user_group_association', 'group_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('share', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('share', 'device_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('path', 'share_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('group', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('device', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###
