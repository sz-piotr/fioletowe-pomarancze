"""empty message

Revision ID: be632a33e4bf
Revises: 30b694d51431
Create Date: 2017-01-28 21:04:54.586528

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'be632a33e4bf'
down_revision = '30b694d51431'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('path', sa.Column('name', sa.String(length=80), nullable=False))
    op.add_column('path', sa.Column('path', sa.String(length=350), nullable=False))
    op.add_column('path', sa.Column('share_id', sa.Integer(), nullable=True))
    op.create_unique_constraint('paths_name_share_id_uc', 'path', ['name', 'share_id'])
    op.create_foreign_key(None, 'path', 'share', ['share_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'path', type_='foreignkey')
    op.drop_constraint('paths_name_share_id_uc', 'path', type_='unique')
    op.drop_column('path', 'share_id')
    op.drop_column('path', 'path')
    op.drop_column('path', 'name')
    # ### end Alembic commands ###
