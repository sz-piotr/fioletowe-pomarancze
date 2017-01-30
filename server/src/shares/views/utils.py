def out_share(share):
    return {
        'name': share.name,
        'device': share.device.name,
        'paths': [out_path(path) for path in share.paths]
    }


def out_path(path):
    return {
        'name': path.name,
        'path': path.path
    }


def out_aval_share(share):
    return {
        'owner': share.user.username,
        'name': share.name,
        'address': share.device.address,
        'paths': [out_path(path) for path in share.paths]
    }

def is_path_aval(user, share_comp, path_comp):
    res_path = None
    for group in user.in_groups:
        for share in group.shares:
            if(share.name == share_comp):
                for path in share.paths:
                    if(path.name == path_comp):
                        res_path = path
    return res_path
