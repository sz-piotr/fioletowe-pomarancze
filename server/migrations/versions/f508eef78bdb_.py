"""empty message

Revision ID: f508eef78bdb
Revises: dc58655fd036
Create Date: 2017-01-30 21:18:00.459508

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f508eef78bdb'
down_revision = 'dc58655fd036'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('share_group_association_share_id_fkey', 'share_group_association', type_='foreignkey')
    op.create_foreign_key(None, 'share_group_association', 'share', ['share_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'share_group_association', type_='foreignkey')
    op.create_foreign_key('share_group_association_share_id_fkey', 'share_group_association', 'share', ['share_id'], ['id'])
    # ### end Alembic commands ###